'use client';
import { FormEvent, FormEventHandler, useState } from 'react';
import Link from 'next/link';
import { TBOARD_ITEM, TpostFormData } from '@/types/upsert';
import FormCategoryBox from './postingform/FormCategoryBox';
import FormTitleInput from './postingform/FormTitleInput';
import FormTagInput from './postingform/FormTagInput';
import FormContentArea from './postingform/FormContentArea';
import {
  CATEGORY_LIST_EN,
  CATEGORY_LIST_KR,
  LOGIN_ALERT,
  VALIDATION_SEQUENCE,
  VALIDATION_SEQUENCE_KR
} from '@/constants/upsert';
import { toast, ToastContainer } from 'react-toastify';
import FormSubmitButton from '../FormSubmitButton';
import { useAuth } from '@/context/auth.context';
import { useRouter } from 'next/navigation';
import BackArrowIcon from '@/assets/images/upsert_image/BackArrowIcon';

const PostingForm = () => {
  const { me: user } = useAuth();
  const router = useRouter();

  const [content, setContent] = useState<string>('');
  const [selectedItemByCategory, setSelectedItemByCategory] = useState<TBOARD_ITEM>({
    category: '',
    content: ''
  });

  if (!user?.id) {
    toast.error(LOGIN_ALERT, { hideProgressBar: false, autoClose: 1500 });
    setTimeout(() => {
      router.push('/login');
    }, 1500);
    return;
  }

  const handleSubmit: FormEventHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const postFormData: TpostFormData = { user_id: user?.id as string, content: content };

    formData.forEach((value, key) => {
      if (key === 'category') {
        postFormData[key] = CATEGORY_LIST_EN[CATEGORY_LIST_KR.indexOf(value as string)];
      } else {
        postFormData[key] = value;
      }
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

    //유효성 검사 통과시 업로드
    const response = await fetch('/api/upsert/posting', {
      method: 'POST',
      body: JSON.stringify(postFormData)
    });

    const { message } = await response.json();

    toast.success(message, { autoClose: 1500 });
    setTimeout(() => {
      router.push('/');
    }, 1500);
    return;
  };

  return (
    <div className="w-[1204px] mx-auto flex flex-col gap-y-5 max-h-screen">
      <ToastContainer />
      <Link className="mb-4" href={'/'}>
        <BackArrowIcon />
      </Link>
      <form className="flex flex-col gap-y-10 h-full" onSubmit={handleSubmit}>
        <FormCategoryBox
          selectedItemByCategory={selectedItemByCategory}
          setSelectedItemByCategory={setSelectedItemByCategory}
        />
        <FormTitleInput />
        <FormTagInput />
        <FormContentArea content={content} setContent={setContent} selectedItemByCategory={selectedItemByCategory} />
        <FormSubmitButton />
      </form>
    </div>
  );
};

export default PostingForm;
