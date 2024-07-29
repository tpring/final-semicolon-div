import ImageIcon from '@/assets/images/upsert_image/markdown/ImageIcon';
import { IMAGE_UPLOAD_TEXT, POST_IMAGE_URL } from '@/constants/upsert';
import { TimageInfo } from '@/types/upsert';
import MDEditor, { commands, ICommand, RefMDEditor } from '@uiw/react-md-editor';
import {
  ChangeEvent,
  ChangeEventHandler,
  Dispatch,
  DragEventHandler,
  FocusEventHandler,
  useEffect,
  useRef,
  useState
} from 'react';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

type CustomMDEditorProps = {
  content: string;
  setContent: Dispatch<React.SetStateAction<string>>;
};

const CustomMDEditor = ({ content, setContent }: CustomMDEditorProps) => {
  const imageInput = useRef<HTMLInputElement>(null);
  const mdEditor = useRef<RefMDEditor>(null);
  const customExtraCommandsWithOutQnA = commands.getCommands().filter(() => false);

  const [initialContent, setInitialContent] = useState<string>('');
  const [editorCursor, setEditorCursor] = useState(0);
  const [usedImages, setUsedImages] = useState<TimageInfo[]>([]);

  const handleChangeImageInput: ChangeEventHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) {
      return;
    }
    uploadPostImage(event.target.files[0]);
    event.target.value = '';
  };

  const handleDropEditor: DragEventHandler<HTMLDivElement> = (event) => {
    event.preventDefault();
    if (!event.dataTransfer) {
      return;
    }
    if (event.dataTransfer.files.length > 0) {
      uploadPostImage(event.dataTransfer.files[0]);
    }
  };

  const handleBlurEditor: FocusEventHandler<HTMLDivElement> = () => {
    if (mdEditor.current?.textarea?.selectionEnd) {
      setEditorCursor(mdEditor.current?.textarea?.selectionEnd);
    }
  };

  const uploadPostImage = async (file: File) => {
    //이미지 파일 검사 로직
    if (!file) {
      return;
    } else if (!file.type.includes('image')) {
      if (!file) return toast.error('이미지 파일을 업로드 해주세요', { autoClose: 2000 });
    }

    //uploadPostImage시 usedImages에서 중복 이미지 검사, 처리
    const duplicatedImage = usedImages.find((image) => image.name === file.name);
    if (duplicatedImage) {
      setContent(
        (prev) =>
          prev.substring(0, editorCursor) +
          `![${duplicatedImage.name}](${duplicatedImage.url})\n` +
          prev.substring(editorCursor, prev.length)
      );
      return;
    }

    setContent(
      (prev) => prev.substring(0, editorCursor) + IMAGE_UPLOAD_TEXT + prev.substring(editorCursor, prev.length)
    );

    const formData = new FormData();
    formData.append('file', file);
    formData.append('name', uuidv4());

    const response = await fetch('/api/upsert/image', {
      method: 'POST',
      body: formData
    });

    const data = await response.json();

    if (data?.url && data?.name) {
      setContent((prev) => prev.replace(IMAGE_UPLOAD_TEXT, `![${data.name}](${data.url})`));
      setUsedImages((prev) => [...prev, { name: data.name, storageName: data.storageName, url: data.url }]);
    }

    setContent((prev) => prev.replace(IMAGE_UPLOAD_TEXT, `![Image]("실패했습니다")`));
  };

  const handleContentChange = (value?: string) => {
    setContent(value!);
  };

  //커스텀 이미지 버튼
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

  //content가 로딩 됐을 때 초기 값 세팅
  useEffect(() => {
    if (content && !initialContent) {
      setInitialContent(content);
      return;
    }
  }, [content]);

  //세팅된 intialContent에서 스토리지에 저장된 이미지들을 찾아서 usedImages에 저장
  useEffect(() => {
    if (!initialContent) return;
    const regex =
      /!\[.*?\]\((https:\/\/jtorewqfshytdtgldztv\.supabase\.co\/storage\/v1\/object\/public\/posts_image\/posts\/[^\s)]+)\)/g;

    if (content.match(regex)) {
      content.match(regex)?.forEach((e) => {
        const name = e.replace(/!\[([^\]]+)\].*/, '$1');
        const storageName = e.replace(/.*posts\/([0-9a-fA-F-]{36}).*/, '$1');
        const url = POST_IMAGE_URL + storageName;
        setUsedImages((prev) => [...prev.filter((item) => item.name !== name), { name, storageName, url }]);
      });
    }
  }, [initialContent]);

  return (
    <>
      <input className="hidden" ref={imageInput} type="file" onChange={handleChangeImageInput} id="file" />
      <MDEditor
        ref={mdEditor}
        id="post-content"
        value={content}
        preview="edit"
        height={540}
        commands={commands.getCommands().map((command) => {
          return command.name === 'image' ? CustomImage : command;
        })}
        extraCommands={customExtraCommandsWithOutQnA}
        onChange={handleContentChange}
        onDrop={handleDropEditor}
        onBlur={handleBlurEditor}
      />
    </>
  );
};

export default CustomMDEditor;
