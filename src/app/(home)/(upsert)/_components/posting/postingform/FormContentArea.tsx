'use client';
import { TBOARD_ITEM } from '@/types/upsert';
import MDEditor, { commands } from '@uiw/react-md-editor';
import React, { Dispatch } from 'react';

type FormContentAreaProps = {
  content: string;
  setContent: Dispatch<React.SetStateAction<string>>;
  selectedItemByCategory: TBOARD_ITEM;
};

const FormContentArea = ({ content, setContent, selectedItemByCategory }: FormContentAreaProps) => {
  const customExtraCommandsWithOutQnA = commands.getCommands().filter(() => false);

  const handleContentChange = (value?: string) => {
    setContent(value!);
  };

  return (
    <div className="">
      <label className="block mb-2 text-[#525252]" htmlFor="post-content">
        본문*
      </label>
      <MDEditor
        id="post-content"
        value={content}
        onChange={handleContentChange}
        preview="edit"
        height={400}
        extraCommands={customExtraCommandsWithOutQnA}
      />
    </div>
  );
};

export default FormContentArea;
