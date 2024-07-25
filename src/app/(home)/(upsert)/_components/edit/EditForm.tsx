'use client';
import React, { FormEvent, FormEventHandler, useEffect, useState } from 'react';
import { TarchivePost, TBOARD_ITEM, TforumPost, TqnaPost } from '@/types/upsert';
import Link from 'next/link';
import { BOARD_LIST } from '@/constants/posting';
import FormCategoryBox from './editform/FormCategoryBox';
import FormTitleInput from './editform/FormTitleInput';
import FormTagInput from './editform/FormTagInput';
import FormContentArea from './editform/FormContentArea';
import FormSubmitButton from './editform/FormSubmitButton';

type UpsertFormProps = {
  data: TforumPost | TqnaPost | TarchivePost;
};

const EditForm = ({ data }: UpsertFormProps) => {
  const [content, setContent] = useState<string>('');
  const [selectedItemByCategory, setSelectedItemByCategory] = useState<TBOARD_ITEM>({
    category: '',
    title: '',
    content: ''
  });
  const [selectedSubCategoryForForum, setSelectedSubCategoryForForum] = useState<string>('');
  const [FORUM, QNA, ARCHIVE] = BOARD_LIST;

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

  useEffect(() => {
    if (!data) {
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
      <Link href={'/'}>뒤로가기 버튼 위치</Link>
      <form className="flex flex-col gap-y-10 h-full" onSubmit={handleSubmit}>
        <FormCategoryBox
          selectedSubCategoryForForum={selectedSubCategoryForForum}
          selectedItemByCategory={selectedItemByCategory}
          setSelectedItemByCategory={setSelectedItemByCategory}
        />
        <FormTitleInput title={data.title} />
        <FormTagInput />
        <FormContentArea content={content} setContent={setContent} selectedItemByCategory={selectedItemByCategory} />
        <FormSubmitButton />
      </form>
    </div>
  );
};

export default EditForm;
