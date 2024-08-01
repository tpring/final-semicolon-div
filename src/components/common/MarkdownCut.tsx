export const removeImageAndCodeBlocks = (markdown: string) => {
  let modifiedContent = markdown.replace(/!\[.*?\]\(.*?\)/g, '');
  modifiedContent = modifiedContent.replace(/```[\s\S]*?```/g, '');
  modifiedContent = modifiedContent.replace(/``[\s\S]*?``/g, '');
  modifiedContent = modifiedContent.replace(/`[\s\S]*?`/g, '');
  return modifiedContent;
};

export const cutText = (text: string, limit: number) => {
  if (text.length > limit) {
    return text.slice(0, limit) + '...';
  }
  return text;
};
