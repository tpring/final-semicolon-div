'use client';
import React, { FormEvent, FormEventHandler, useState } from 'react';
import Link from 'next/link';
import { TBOARD_ITEM } from '@/types/upsert';
import FormCategoryBox from './postingform/FormCategoryBox';
import FormTitleInput from './postingform/FormTitleInput';
import FormTagInput from './postingform/FormTagInput';
import FormContentArea from './postingform/FormContentArea';
import FormSubmitButton from './postingform/FormSubmitButton';

const PostingForm = () => {
  const [content, setContent] = useState<string>('');
  const [selectedItemByCategory, setSelectedItemByCategory] = useState<TBOARD_ITEM>({
    category: '',
    title: '',
    content: ''
  });

  const handleSubmit: FormEventHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    //값 잘 들어오는지 확인하는 임시 코드
    console.log(formData.get('category-selector'));
    selectedItemByCategory.category !== '포럼' ? null : console.log(formData.get('sub-category'));
    console.log(formData.get('post-title'));
    console.log(formData.get('post-tag'));
    console.log(content);
  };

  return (
    <div className="max-w-3xl mx-auto flex flex-col gap-y-5 max-h-screen">
      <Link href={'/'}>뒤로가기 버튼 위치</Link>
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
