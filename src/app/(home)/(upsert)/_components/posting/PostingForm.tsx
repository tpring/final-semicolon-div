'use client';
import { MouseEventHandler, useEffect, useState } from 'react';
import { TpostFormData } from '@/types/upsert';
import FormTitleInput from '../FormTitleInput';
import FormTagInput from './postingform/FormTagInput';
import FormContentArea from '../FormContentArea';
import { CATEGORY_LIST_EN, CATEGORY_LIST_KR, FORUM_SUB_CATEGORY_LIST, LOGIN_ALERT } from '@/constants/upsert';
import { toast } from 'react-toastify';
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
import { useUpsertValidationStore } from '@/store/upsertValidationStore';

const PostingForm = () => {
  const router = useRouter();
  const { categoryGroup, subCategory, clearCategory } = usePostingCategoryStore();
  const { me: user } = useAuth();
  const [title, setTitle] = useState<string>('');
  const [tagList, setTagList] = useState<Array<Ttag>>(TAG_LIST);
  const [thumbnail, setThumbnail] = useState<File>();
  const [content, setContent] = useState<string>('');
  const {
    isValidCategory,
    isValidTitle,
    isValidContent,
    setIsValidCategory,
    setIsValidContent,
    setIsValidTitle,
    clearAllValid
  } = useUpsertValidationStore();

  if (!user?.id) {
    toast.error(LOGIN_ALERT, { hideProgressBar: false, autoClose: 1500, onClose: () => router.push(`/login`) });
    return;
  }

  const handleSubmit = async (): Promise<void> => {
    const category = CATEGORY_LIST_EN[CATEGORY_LIST_KR.indexOf(categoryGroup.category ?? '')];

    // 폼 유효성 검사 로직

    if (!category) {
      setIsValidCategory(false);
    } else if (
      category === 'forum' &&
      !FORUM_SUB_CATEGORY_LIST.find((FORUM_SUB_CATEGORY) => subCategory === FORUM_SUB_CATEGORY)
    ) {
      setIsValidCategory(false);
    }

    if (!title) {
      setIsValidTitle(false);
    }

    if (!content) {
      setIsValidContent(false);
    }

    if (!isValidCategory || !isValidTitle) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    } else if (!isValidContent) {
      return;
    }

    const postData: TpostFormData = {
      title: title,
      user_id: user?.id,
      content: content,
      category,
      forum_category: subCategory
    };

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
    clearAllValid();
    return;
  };

  const handleBackClick: MouseEventHandler<HTMLDivElement> = () => {
    router.back();
  };

  useEffect(() => {
    return () => {
      clearCategory();
    };
  }, []);

  return (
    <div className="w-[1204px] mx-auto flex flex-col gap-y-5 max-h-screen">
      <div className="mb-4" onClick={handleBackClick}>
        <BackArrowIcon />
      </div>
      <UpsertTheme />
      <form className="flex flex-col gap-y-10 h-full">
        <PostingCategoryBox />
        <FormTitleInput title={title} setTitle={setTitle} isEdit={false} />
        <FormTagInput tagList={tagList} setTagList={setTagList} />
        <ThumbNailBox setThumbnail={setThumbnail} />
        <FormContentArea content={content} setContent={setContent} isEdit={false} />
        <FormSubmitButton handleSubmit={handleSubmit} isEdit={false} />
      </form>
    </div>
  );
};

export default PostingForm;
