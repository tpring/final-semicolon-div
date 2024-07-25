import MDEditor, { commands } from '@uiw/react-md-editor';
import React, { Dispatch } from 'react';

type FormContentAreaProps = {
  content: string;
  setContent: Dispatch<React.SetStateAction<string>>;
};

const FormContentArea = ({ content, setContent }: FormContentAreaProps) => {
  const customExtraCommandsWithOutQnA = commands.getCommands().filter(() => false);

  const handleContentChange = (value?: string) => {
    setContent(value!);
  };

  return (
    <div className="">
      <label className="block text-[#525252] mb-2" htmlFor="post-content">
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
