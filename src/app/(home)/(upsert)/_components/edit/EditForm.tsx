'use client';
import { FormEvent, FormEventHandler, useEffect, useState } from 'react';
import { TarchivePost, TforumPost, TpostFormData, TqnaPost } from '@/types/upsert';
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

import FormTitleInput from './editform/FormTitleInput';
import FormTagInput from './editform/FormTagInput';
import FormContentArea from './editform/FormContentArea';
import { useRouter } from 'next/navigation';
import { revalidate } from '@/actions/revalidate';
import { toast, ToastContainer } from 'react-toastify';
import FormSubmitButton from '../FormSubmitButton';
import { useAuth } from '@/context/auth.context';
import BackArrowIcon from '@/assets/images/upsert_image/BackArrowIcon';
import ThumbNailBox from '../ThumbNailBox';
import { usePostingCategoryStore } from '@/store/postingCategoryStore';
import PostingCategory from './editform/categorybox/PostingCategory';
import { v4 as uuidv4 } from 'uuid';

type UpsertFormProps = {
  data: TforumPost | TqnaPost | TarchivePost;
  path: string;
};

const EditForm = ({ data, path }: UpsertFormProps) => {
  const { me: user } = useAuth();
  const { categoryGroup, subCategory, setCategoryGroup, setSubCategory } = usePostingCategoryStore();
  const router = useRouter();
  const [content, setContent] = useState<string>('');
  const [prevUrl, setPrevUrl] = useState<string>('');
  const [isThumbnailUrlDeleted, setisThumbnailUrlDeleted] = useState<boolean>(false);
  const [FORUM, QNA, ARCHIVE] = BOARD_LIST;

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

    const postData: TpostFormData = {
      user_id: user?.id as string,
      content: content,
      category,
      forum_category: subCategory
    };

    formData.forEach((value, key) => {
      postData[key] = value;
    });

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

    const thumbnailFormData = new FormData(event.currentTarget);
    thumbnailFormData.append('category', category);
    thumbnailFormData.append('name', uuidv4());
    thumbnailFormData.append('prevUrl', prevUrl);
    if (isThumbnailUrlDeleted) {
      thumbnailFormData.append('isThumbnailUrlDeleted', `${isThumbnailUrlDeleted}`);
    }
    //썸네일 상태 검사 로직
    const thumbnail = await fetch('/api/upsert/thumbnail', {
      method: 'PATCH',
      body: thumbnailFormData
    });

    const { url: thumbnailUrl, message: thumbnailMessage } = await thumbnail.json();

    if (thumbnailMessage) {
      toast.error(thumbnailMessage);
      return;
    }

    //유효성 검사 통과시 업데이트 요청
    const response = await fetch(path, {
      method: 'PATCH',
      body: JSON.stringify({ ...postData, path, thumbnail: thumbnailUrl })
    });
    const { data, message } = await response.json();

    if (!data) {
      toast.error(message, { autoClose: 1500, hideProgressBar: true });
      return;
    }

    await revalidate('/', 'layout');

    toast.success(message, {
      autoClose: 1500,
      hideProgressBar: true,
      onClose: () => router.push(`/${category}`)
    });
    return;
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
        setSubCategory((data as TforumPost).forum_category);
        setContent(data.content);
        setPrevUrl(data.thumbnail ?? '');
        break;
      case 'qna':
        setCategoryGroup(QNA);
        setContent(data.content);
        setPrevUrl(data.thumbnail ?? '');
        break;
      case 'archive':
        setCategoryGroup(ARCHIVE);
        setContent(data.content);
        setPrevUrl(data.thumbnail ?? '');
        break;
    }
  }, [data, user]);

  return (
    <div className="w-[1204px] mx-auto flex flex-col gap-y-5 max-h-screen">
      <ToastContainer />
      <Link href={'/'}>
        <BackArrowIcon />
      </Link>
      <form className="flex flex-col gap-y-10 h-full" onSubmit={handleSubmit}>
        <PostingCategory />
        <FormTitleInput title={data.title} />
        <FormTagInput />
        <ThumbNailBox prevUrl={prevUrl} setisThumbnailUrlDeleted={setisThumbnailUrlDeleted} />
        <FormContentArea content={content} setContent={setContent} />
        <FormSubmitButton />
      </form>
    </div>
  );
};

export default EditForm;
