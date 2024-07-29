'use client';

import MDEditor, { commands } from '@uiw/react-md-editor';
import { useState } from 'react';

const InputComments = () => {
  const [content, setContent] = useState<string>('');

  const handleCommentChange = (value?: string) => {
    setContent(value!);
  };

  return (
    <div className="flex justify-start items-center border p-4 ">
      <div className=" flex flex-col justify-end items-end w-full gap-2">
        <MDEditor
          value={content}
          onChange={handleCommentChange}
          preview="edit"
          extraCommands={commands.getCommands().filter(() => false)}
          commands={commands.getCommands().filter((command) => {
            return command.name !== 'image';
          })}
          textareaProps={{ maxLength: 1000 }}
          className="w-full "
        />
        <div className="flex gap-4">
          <button className="bg-slate-200 py-2 px-4">취소</button>
          <button className="bg-slate-200 py-2 px-4">등록</button>
        </div>
      </div>
    </div>
  );
};

export default InputComments;
