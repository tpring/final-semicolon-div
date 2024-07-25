'use client';
import React, { FormEvent, FormEventHandler, useEffect, useState } from 'react';
import { TarchivePost, TBOARD_ITEM, TforumPost, TpostFormData, TqnaPost } from '@/types/upsert';
import Link from 'next/link';
import {
  BOARD_LIST,
  CATEGORY_LIST_EN,
  CATEGORY_LIST_KR,
  LOGIN_ALERT,
  VALIDATION_SEQUENCE,
  VALIDATION_SEQUENCE_KR
} from '@/constants/upsert';
import FormCategoryBox from './editform/FormCategoryBox';
import FormTitleInput from './editform/FormTitleInput';
import FormTagInput from './editform/FormTagInput';
import FormContentArea from './editform/FormContentArea';
import { useRouter } from 'next/navigation';
import { revalidate } from '@/actions/revalidate';
import { toast, ToastContainer } from 'react-toastify';
import FormSubmitButton from '../FormSubmitButton';
import { useAuth } from '@/context/auth.context';

type UpsertFormProps = {
  data: TforumPost | TqnaPost | TarchivePost;
  path: string;
};

const EditForm = ({ data, path }: UpsertFormProps) => {
  const user = useAuth().me;
  const router = useRouter();

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
      user_id: user?.id as string,
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

    const invalidItemIndex = VALIDATION_SEQUENCE.findIndex((sequence) => {
      return !!invalidItems.find((item) => item === sequence);
    });

    const invalidItem = VALIDATION_SEQUENCE_KR[invalidItemIndex];

    if (invalidItem) {
      toast.error(invalidItem + ' 입력이 필요합니다!', { hideProgressBar: true });
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
    } else if (!user) {
      toast.error(LOGIN_ALERT, { autoClose: 1000, hideProgressBar: true });
      setTimeout(() => {
        router.push('/login');
      }, 1000);
    } else if (data.user_id !== user?.id) {
      toast.error('권한이 없습니다!', { autoClose: 1000, hideProgressBar: true });
      setTimeout(() => {
        router.push('/');
      }, 1000);
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
  }, [data, user]);

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
