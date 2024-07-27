import ImageIcon from '@/assets/images/upsert_image/markdown/ImageIcon';
import { IMAGE_UPLOAD_TEXT } from '@/constants/upsert';
import MDEditor, { commands, ICommand } from '@uiw/react-md-editor';
import { ChangeEvent, ChangeEventHandler, Dispatch, useRef } from 'react';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

type CustomMDEditorProps = {
  content: string;
  setContent: Dispatch<React.SetStateAction<string>>;
};

const CustomMDEditor = ({ content, setContent }: CustomMDEditorProps) => {
  const imageInput = useRef<HTMLInputElement>(null);
  const customExtraCommandsWithOutQnA = commands.getCommands().filter(() => false);

  const handleImageUpload: ChangeEventHandler = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    } else if (!file.type.includes('image')) {
      if (!file) return toast.error('이미지 파일을 업로드 해주세요', { autoClose: 2000 });
    }
    setContent((prev) => prev + '\n' + IMAGE_UPLOAD_TEXT);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('name', uuidv4());

    const response = await fetch('/api/upsert/image', {
      method: 'POST',
      body: formData
    });

    const data = await response.json();
    data?.url
      ? setContent((prev) => prev.replace(IMAGE_UPLOAD_TEXT, `![Image](${data.url})`))
      : setContent((prev) => prev.replace(IMAGE_UPLOAD_TEXT, `![Image]("실패했습니다")`));
  };
  const handleContentChange = (value?: string) => {
    setContent(value!);
  };

  const CustomImage = {
    name: 'image',
    keyCommand: 'image',
    buttonProps: { 'aria-label': 'Insert image' },
    icon: <ImageIcon />,
    render: (_: ICommand<string>, disabled: boolean) => {
      return (
        <button
          type="button"
          data-name="image"
          aria-label="Add image"
          title="Add image (click)"
          disabled={disabled}
          onClick={(event) => {
            event.stopPropagation();
            imageInput?.current ? imageInput.current.click() : null;
          }}
        >
          <ImageIcon />
        </button>
      );
    }
  };

  return (
    <>
      <input ref={imageInput} type="file" hidden onChange={handleImageUpload} />
      <MDEditor
        id="post-content"
        value={content}
        onChange={handleContentChange}
        preview="edit"
        height={540}
        commands={commands.getCommands().map((command) => {
          return command.name === 'image' ? CustomImage : command;
        })}
        extraCommands={customExtraCommandsWithOutQnA}
      />
    </>
  );
};

export default CustomMDEditor;
