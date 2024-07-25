'use client';
import React, { FormEvent, FormEventHandler, useEffect, useState } from 'react';
import { TarchivePost, TBOARD_ITEM, TforumPost, TpostFormData, TqnaPost } from '@/types/upsert';
import Link from 'next/link';
import { BOARD_LIST, CATEGORY_LIST_EN, CATEGORY_LIST_KR, VALIDATION_SEQUENCE } from '@/constants/upsert';
import FormCategoryBox from './editform/FormCategoryBox';
import FormTitleInput from './editform/FormTitleInput';
import FormTagInput from './editform/FormTagInput';
import FormContentArea from './editform/FormContentArea';
import { useRouter } from 'next/navigation';
import { revalidate } from '@/actions/revalidate';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FormSubmitButton from '../FormSubmitButton';

type UpsertFormProps = {
  data: TforumPost | TqnaPost | TarchivePost;
  path: string;
};

const EditForm = ({ data, path }: UpsertFormProps) => {
  const router = useRouter();
  const testUser = { user_id: '5ff01201-e219-40ab-b621-ee2c79ed6d0e', email: 'ycdm03@gmail.com', nickname: 'ycmd03' };

  const [content, setContent] = useState<string>('');
  const [selectedItemByCategory, setSelectedItemByCategory] = useState<TBOARD_ITEM>({
    category: '',
    content: ''
  });
  const [selectedSubCategoryForForum, setSelectedSubCategoryForForum] = useState<string>('');

  const [FORUM, QNA, ARCHIVE] = BOARD_LIST;

  const handleSubmit: FormEventHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const category = CATEGORY_LIST_EN[CATEGORY_LIST_KR.indexOf(selectedItemByCategory.category)];

    const formData = new FormData(event.currentTarget);
    const postFormData: TpostFormData = {
      category,
      user_id: testUser.user_id,
      content
    };

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

    //유효성 검사 통과시 업데이트 요청
    const response = await fetch(path, {
      method: 'PATCH',
      body: JSON.stringify({ ...postFormData, path }),
      headers: { 'Content-Type': 'application/json' }
    });
    const { data, message } = await response.json();

    if (!data) {
      toast.error(message, { hideProgressBar: true });
      return;
    }

    await revalidate('/');
    toast.success(message, { hideProgressBar: true });
    setTimeout(() => {
      router.push('/');
    }, 1000);

    return;
  };

  useEffect(() => {
    if (!data) {
      return;
    } else if (data.user_id !== testUser.user_id) {
      toast('권한이 없습니다!');
      router.push('/');
      return;
    }

    switch (data.category) {
      case 'forum':
        setSelectedItemByCategory(FORUM);
        setSelectedSubCategoryForForum((data as TforumPost).forum_category);
        setContent(data.content);
        break;
      case 'qna':
        setSelectedItemByCategory(QNA);
        setContent(data.content);
        break;
      case 'archive':
        setSelectedItemByCategory(ARCHIVE);
        setContent(data.content);
        break;
    }
  }, [data]);

  return (
    <div className="max-w-3xl mx-auto flex flex-col gap-y-5 max-h-screen">
      <ToastContainer />
      <Link href={'/'}>&lt;</Link>
      <form className="flex flex-col gap-y-10 h-full" onSubmit={handleSubmit}>
        <FormCategoryBox
          selectedSubCategoryForForum={selectedSubCategoryForForum}
          selectedItemByCategory={selectedItemByCategory}
          setSelectedItemByCategory={setSelectedItemByCategory}
        />
        <FormTitleInput title={data.title} />
        <FormTagInput />
        <FormContentArea content={content} setContent={setContent} />
        <FormSubmitButton />
      </form>
    </div>
  );
};

export default EditForm;
