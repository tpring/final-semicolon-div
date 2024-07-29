'use client';
import { FormEvent, FormEventHandler, useState } from 'react';
import Link from 'next/link';
import { TpostFormData } from '@/types/upsert';
import FormTitleInput from './postingform/FormTitleInput';
import FormTagInput from './postingform/FormTagInput';
import FormContentArea from './postingform/FormContentArea';
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

const PostingForm = () => {
  const { categoryGroup, subCategory, clearCategory } = usePostingCategoryStore();
  const { me: user } = useAuth();
  const router = useRouter();

  const [content, setContent] = useState<string>('');

  if (!user?.id) {
    toast.error(LOGIN_ALERT, { hideProgressBar: false, autoClose: 1500, onClose: () => router.push(`/login`) });
    return;
  }

  const handleSubmit: FormEventHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const category = CATEGORY_LIST_EN[CATEGORY_LIST_KR.indexOf(categoryGroup.category)];

    if (
      category === 'forum' &&
      !FORUM_SUB_CATEGORY_LIST.find((FORUM_SUB_CATEGORY) => subCategory === FORUM_SUB_CATEGORY)
    ) {
      toast.error('포럼 서브 카테고리를 선택해 주세요!', { autoClose: 1500 });
      return;
    }

    const postFormData: TpostFormData = {
      user_id: user?.id as string,
      content: content,
      category,
      forum_category: subCategory
    };

    formData.forEach((value, key) => {
      postFormData[key] = value;
    });

    //폼 유효성 검사 로직
    const invalidItems = Object.keys(postFormData).filter((key) => !postFormData[key]);
    const invalidItemIndex = VALIDATION_SEQUENCE.findIndex((sequence) => {
      return !!invalidItems.find((item) => item === sequence);
    });
    const invalidItem = VALIDATION_SEQUENCE_KR[invalidItemIndex];

    if (invalidItem) {
      toast.error(invalidItem + ' 입력이 필요합니다!', { hideProgressBar: true });
      return;
    }

    // 유효성 검사 통과시 업로드 썸네일 업로드 후 글업로드
    const response = await fetch('/api/upsert/posting', {
      method: 'POST',
      body: JSON.stringify(postFormData)
    });
    const { message } = await response.json();
    toast.success(message, { autoClose: 1500, onClose: () => router.push(`/${category}`) });
    clearCategory();
    return;
  };

  return (
    <div className="w-[1204px] mx-auto flex flex-col gap-y-5 max-h-screen">
      <ToastContainer />
      <Link className="mb-4" href={'/'}>
        <BackArrowIcon />
      </Link>
      <UpsertTheme />
      <form className="flex flex-col gap-y-10 h-full" onSubmit={handleSubmit}>
        <PostingCategoryBox />
        <FormTitleInput />
        <FormTagInput />
        <h5 className="block mb-2 text-gray-900 text-h5 font-bold">썸네일</h5>
        <ThumbNailBox />
        <FormContentArea content={content} setContent={setContent} />
        <FormSubmitButton />
      </form>
    </div>
  );
};

export default PostingForm;
