import { slangs } from './slangs';

export const removeImageAndCodeBlocks = (markdown: string) => {
  let modifiedContent = markdown.replace(/!\[.*?\]\(.*?\)/g, '');
  modifiedContent = modifiedContent.replace(/```[\s\S]*?```/g, '');
  modifiedContent = modifiedContent.replace(/``[\s\S]*?``/g, '');
  modifiedContent = modifiedContent.replace(/`[\s\S]*?`/g, '');
  return modifiedContent;
};

export const filterSlang = (text: string): string => {
  let filteredSlang = text;
  slangs.forEach((word) => {
    const regex = new RegExp(word, 'gi');
    filteredSlang = filteredSlang.replace(regex, '**');
  });
  return filteredSlang;
};

export const cutText = (text: string, limit: number): string => {
  let cutText = text.length > limit ? text.slice(0, limit) + '...' : text;

  cutText = filterSlang(cutText);
  return cutText;
};
