'use client';
import { MouseEventHandler, useState } from 'react';
import { TpostFormData } from '@/types/upsert';
import FormTitleInput from '../FormTitleInput';
import FormTagInput from './postingform/FormTagInput';
import FormContentArea from '../FormContentArea';
import {
  CATEGORY_LIST_EN,
  CATEGORY_LIST_KR,
  FORUM_SUB_CATEGORY_LIST,
  LOGIN_ALERT,
  VALIDATION_SEQUENCE,
  VALIDATION_SEQUENCE_KR
} from '@/constants/upsert';
import { toast, ToastContainer } from 'react-toastify';
import FormSubmitButton from '../FormSubmitButton';
import { useAuth } from '@/context/auth.context';
import { useRouter } from 'next/navigation';
import BackArrowIcon from '@/assets/images/upsert_image/BackArrowIcon';
import { usePostingCategoryStore } from '@/store/postingCategoryStore';
import PostingCategoryBox from './postingform/PostingCategoryBox';
import UpsertTheme from '../UpsertTheme';
import ThumbNailBox from '../ThumbNailBox';
import { TAG_LIST } from '@/constants/tags';
import { uploadThumbnail } from '../../_utils/thumbnail';

const PostingForm = () => {
  const router = useRouter();
  const { categoryGroup, subCategory, clearCategory } = usePostingCategoryStore();
  const { me: user } = useAuth();
  const [title, setTitle] = useState<string>('');
  const [tagList, setTagList] = useState<Array<Ttag>>(TAG_LIST);
  const [thumbnail, setThumbnail] = useState<File>();
  const [content, setContent] = useState<string>('');

  if (!user?.id) {
    toast.error(LOGIN_ALERT, { hideProgressBar: false, autoClose: 1500, onClose: () => router.push(`/login`) });
    return;
  }

  const handleSubmit = async (): Promise<void> => {
    const category = CATEGORY_LIST_EN[CATEGORY_LIST_KR.indexOf(categoryGroup.category ?? '')];

    if (
      category === 'forum' &&
      !FORUM_SUB_CATEGORY_LIST.find((FORUM_SUB_CATEGORY) => subCategory === FORUM_SUB_CATEGORY)
    ) {
      toast.error('포럼 서브 카테고리를 선택해 주세요!', { autoClose: 1500, hideProgressBar: true });
      return;
    }

    const postData: TpostFormData = {
      title: title,
      user_id: user?.id,
      content: content,
      category,
      forum_category: subCategory
    };

    // 폼 유효성 검사 로직

    const invalidItems = Object.keys(postData).filter((key) => !postData[key]);
    const invalidItemIndex = VALIDATION_SEQUENCE.findIndex((sequence) => {
      return !!invalidItems.find((item) => item === sequence);
    });
    const invalidItem = VALIDATION_SEQUENCE_KR[invalidItemIndex];

    if (invalidItem) {
      toast.error(invalidItem + ' 입력이 필요합니다!', { hideProgressBar: true });
      return;
    }

    // 유효성 검사 통과시 업로드 썸네일-글-태그순서로 업로드

    const thumbnailUrl = thumbnail ? await uploadThumbnail(thumbnail, category) : null;

    const response = await fetch('/api/upsert/posting', {
      method: 'POST',
      body: JSON.stringify({ ...postData, thumbnailUrl })
    });
    const { data, message } = await response.json();

    const tagsArray = tagList.filter((tag) => tag.selected === true);
    if (tagsArray.length > 0 && !!data[0].id) {
      const response = await fetch(`/api/upsert/tags/${data[0].id}`, {
        method: 'POST',
        body: JSON.stringify({ user_id: user.id, tags: tagsArray, category: data[0].category })
      });
    }

    toast.success(message, { autoClose: 1500, onClose: () => router.push(`/${category}/${data[0].id}`) });
    clearCategory();
    return;
  };

  const handleBackClick: MouseEventHandler<HTMLDivElement> = () => {
    router.back();
  };

  return (
    <div className="w-[1204px] mx-auto flex flex-col gap-y-5 max-h-screen">
      <ToastContainer />
      <div className="mb-4" onClick={handleBackClick}>
        <BackArrowIcon />
      </div>
      <UpsertTheme />
      <form className="flex flex-col gap-y-10 h-full">
        <PostingCategoryBox />
        <FormTitleInput title={title} setTitle={setTitle} />
        <FormTagInput tagList={tagList} setTagList={setTagList} />
        <ThumbNailBox setThumbnail={setThumbnail} />
        <FormContentArea content={content} setContent={setContent} />
        <FormSubmitButton content={content} handleSubmit={handleSubmit} isEdit={false} />
      </form>
    </div>
  );
};

export default PostingForm;
