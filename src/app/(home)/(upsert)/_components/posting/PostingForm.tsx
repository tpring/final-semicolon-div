'use client';
import React, { FormEvent, FormEventHandler, useState } from 'react';
import Link from 'next/link';
import { TBOARD_ITEM, TpostFormData } from '@/types/upsert';
import FormCategoryBox from './postingform/FormCategoryBox';
import FormTitleInput from './postingform/FormTitleInput';
import FormTagInput from './postingform/FormTagInput';
import FormContentArea from './postingform/FormContentArea';

import { CATEGORY_LIST_EN, CATEGORY_LIST_KR, VALIDATION_SEQUENCE } from '@/constants/upsert';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FormSubmitButton from '../FormSubmitButton';

const PostingForm = () => {
  const testUser = { user_id: '5ff01201-e219-40ab-b621-ee2c79ed6d0e', email: 'ycdm03@gmail.com', nickname: 'ycmd03' };

  const [content, setContent] = useState<string>('');
  const [selectedItemByCategory, setSelectedItemByCategory] = useState<TBOARD_ITEM>({
    category: '',
    content: ''
  });

  const handleSubmit: FormEventHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const postFormData: TpostFormData = { user_id: testUser.user_id, content: content };

    formData.forEach((value, key) => {
      if (key === 'category') {
        postFormData[key] = CATEGORY_LIST_EN[CATEGORY_LIST_KR.indexOf(value as string)];
      } else {
        postFormData[key] = value;
      }
    });

    //폼 유효성 검사 로직
    const invalidItems = Object.keys(postFormData).filter((key) => !postFormData[key]);

    const invalidItem = VALIDATION_SEQUENCE.find((sequence) => {
      return !!invalidItems.find((item) => item === sequence);
    });

    if (invalidItem) {
      toast.error(invalidItem + '을 입력해주세요!', { hideProgressBar: true });
      return;
    }

    //유효성 검사 통과시 업로드
    const response = await fetch('/api/upsert/posting', {
      method: 'POST',
      body: JSON.stringify(postFormData)
    });

    const { message } = await response.json();
    return toast.success(message, { hideProgressBar: true });
  };

  return (
    <div className="max-w-3xl mx-auto flex flex-col gap-y-5 max-h-screen">
      <ToastContainer />
      <Link href={'/'}>&lt;</Link>
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
