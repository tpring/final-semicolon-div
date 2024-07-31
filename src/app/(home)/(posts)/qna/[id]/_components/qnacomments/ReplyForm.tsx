import MDEditor, { commands } from '@uiw/react-md-editor';
import Image from 'next/image';
import { useState } from 'react';
import ButtonBox from './ButtonBox';

const ReplyForm = () => {
  const [content, setContent] = useState<string>('');
  const handleChangeContent = (value?: string) => {
    setContent(value!);
  };
  const handleReplySubmit = () => {};
  return (
    <form className="py-6 px-9 w-[1152px] h-[296px] flex flex-col border-y" onSubmit={handleReplySubmit}>
      <div className="flex items-center gap-4 mb-6">
        <span>
          <Image src={''} alt="profile" width={48} height={48} />
        </span>
        <MDEditor
          value={content}
          onChange={handleChangeContent}
          height={176}
          style={{ width: '1052px' }}
          preview="edit"
          extraCommands={commands.getCommands().filter(() => false)}
          textareaProps={{ maxLength: 1000 }}
        />
      </div>
      <ButtonBox />
    </form>
  );
};

export default ReplyForm;
