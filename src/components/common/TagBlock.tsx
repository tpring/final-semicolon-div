type TagBlockProps = { tag: string };

const TagBlock = ({ tag }: TagBlockProps) => {
  return (
    <span className="text-subtitle2 font-medium gap-1 text-neutral-700 bg-neutral-50 px-3 py-1 rounded">
      {'#' + tag}
    </span>
  );
};

export default TagBlock;
