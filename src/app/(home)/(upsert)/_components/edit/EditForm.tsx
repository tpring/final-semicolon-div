'use client';
import { MouseEventHandler, useEffect, useState } from 'react';
import { TeditArchiveData, TeditForumData, TeditQnaData, TpostFormData } from '@/types/upsert';
import Link from 'next/link';
import {
  BOARD_LIST,
  CATEGORY_LIST_EN,
  CATEGORY_LIST_KR,
  FORUM_SUB_CATEGORY_LIST,
  LOGIN_ALERT,
  VALIDATION_SEQUENCE,
  VALIDATION_SEQUENCE_KR
} from '@/constants/upsert';

import FormTitleInput from '../FormTitleInput';
import FormTagInput from './editform/FormTagInput';
import FormContentArea from './editform/FormContentArea';
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';
import FormSubmitButton from '../FormSubmitButton';
import { useAuth } from '@/context/auth.context';
import BackArrowIcon from '@/assets/images/upsert_image/BackArrowIcon';
import ThumbNailBox from '../ThumbNailBox';
import { usePostingCategoryStore } from '@/store/postingCategoryStore';
import PostingCategory from './editform/categorybox/PostingCategory';
import { TAG_LIST } from '@/constants/tags';
import { revalidatePostTag } from '@/actions/revalidatePostTag';
import { deleteThumbnail, patchThumbnail, uploadThumbnail } from '../../_utils/thumbnail';

type UpsertFormProps = {
  data: TeditForumData | TeditQnaData | TeditArchiveData;
  path: string;
};

const EditForm = ({ data, path }: UpsertFormProps) => {
  const router = useRouter();
  const { me: user } = useAuth();
  const { categoryGroup, subCategory, setCategoryGroup, setSubCategory } = usePostingCategoryStore();
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [prevUrl, setPrevUrl] = useState<string>('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagList, setTagList] = useState<Array<Ttag>>(TAG_LIST);
  const [isThumbnailUrlDeleted, setisThumbnailUrlDeleted] = useState<boolean>(false);
  const [thumbnail, setThumbnail] = useState<File>();
  const [FORUM, QNA, ARCHIVE] = BOARD_LIST;

  const handleSubmit = async (): Promise<void> => {
    const category = CATEGORY_LIST_EN[CATEGORY_LIST_KR.indexOf(categoryGroup.category)];
    if (
      category === 'forum' &&
      !FORUM_SUB_CATEGORY_LIST.find((FORUM_SUB_CATEGORY) => subCategory === FORUM_SUB_CATEGORY)
    ) {
      toast.error('포럼 서브 카테고리를 선택해 주세요!', { autoClose: 1500, hideProgressBar: true });
      return;
    }

    const postData: TpostFormData = {
      title,
      user_id: user?.id as string,
      content: content,
      category,
      forum_category: subCategory
    };

    //폼 유효성 검사 로직
    const invalidItems = Object.keys(postData).filter((key) => !postData[key]);

    const invalidItemIndex = VALIDATION_SEQUENCE.findIndex((sequence) => {
      return !!invalidItems.find((item) => item === sequence);
    });

    const invalidItem = VALIDATION_SEQUENCE_KR[invalidItemIndex];
    if (invalidItem) {
      toast.error(invalidItem + ' 입력이 필요합니다!', { autoClose: 1500, hideProgressBar: true });
      return;
    }

    //썸네일 상태 검사 로직
    const thumbnailUrl =
      !prevUrl && thumbnail
        ? await uploadThumbnail(thumbnail, category)
        : prevUrl && !thumbnail
          ? await deleteThumbnail(thumbnail!, category, prevUrl)
          : isThumbnailUrlDeleted
            ? await patchThumbnail(thumbnail!, category, prevUrl, isThumbnailUrlDeleted)
            : null;

    //유효성 검사 통과시 업데이트 요청
    const response = await fetch(path, {
      method: 'PATCH',
      body: JSON.stringify({
        ...postData,
        path,
        thumbnail: thumbnailUrl,
        tags: tagList.filter((tag) => tag.selected),
        user_id: user?.id
      })
    });
    const { data, message } = await response.json();

    if (!data) {
      toast.error(message, { autoClose: 1500, hideProgressBar: true });
      return;
    }

    await revalidatePostTag(`edit-${path}`);

    toast.success(message, {
      autoClose: 1500,
      hideProgressBar: true,
      onClose: () => router.push(`/${category}`)
    });
    return;
  };

  const handleBackClick: MouseEventHandler<HTMLDivElement> = () => {
    router.back();
  };

  useEffect(() => {
    if (!data) {
      return;
    } else if (!user) {
      toast.error(LOGIN_ALERT, { autoClose: 1500, hideProgressBar: true, onClose: () => router.push(`/login`) });
    } else if (data.user_id !== user?.id) {
      toast.error('권한이 없습니다!', { autoClose: 1500, hideProgressBar: true, onClose: () => router.push(`/`) });
      return;
    }

    switch (data.category) {
      case 'forum':
        setCategoryGroup(FORUM);
        setSubCategory((data as TeditForumData).forum_category);
        (data as TeditForumData).forum_tags.length !== 0
          ? setTags((data as TeditForumData).forum_tags.map((tag) => tag.tag ?? ''))
          : null;
        setTitle(data.title);
        setContent(data.content);
        setPrevUrl(data.thumbnail ?? '');
        break;
      case 'qna':
        setCategoryGroup(QNA);
        (data as TeditQnaData).qna_tags.length !== 0
          ? setTags((data as TeditQnaData).qna_tags.map((tag) => tag.tag ?? ''))
          : null;
        setTitle(data.title);
        setContent(data.content);
        setPrevUrl(data.thumbnail ?? '');
        break;
      case 'archive':
        setCategoryGroup(ARCHIVE);
        (data as TeditArchiveData).archive_tags.length !== 0
          ? setTags((data as TeditArchiveData)?.archive_tags.map((tag) => tag.tag ?? ''))
          : null;
        setTitle(data.title);
        setContent(data.content);
        setPrevUrl(data.thumbnail ?? '');
        break;
    }
  }, [data, user]);

  useEffect(() => {
    setTagList(
      TAG_LIST.map((TAG) => {
        return tags.includes(TAG.name) ? { ...TAG, selected: !TAG.selected } : TAG;
      })
    );
  }, [tags]);

  return (
    <div className="w-[1204px] mx-auto flex flex-col gap-y-5 max-h-screen">
      <ToastContainer />
      <div className="mb-4" onClick={handleBackClick}>
        <BackArrowIcon />
      </div>
      <form className="flex flex-col gap-y-10 h-full" onSubmit={handleSubmit}>
        <PostingCategory />
        <FormTitleInput title={title} setTitle={setTitle} />
        <FormTagInput tagList={tagList} setTagList={setTagList} />
        <ThumbNailBox
          prevUrl={prevUrl}
          setisThumbnailUrlDeleted={setisThumbnailUrlDeleted}
          setThumbnail={setThumbnail}
        />
        <FormContentArea content={content} setContent={setContent} />
        <FormSubmitButton content={content} handleSubmit={handleSubmit} isEdit={true} />
      </form>
    </div>
  );
};

export default EditForm;
