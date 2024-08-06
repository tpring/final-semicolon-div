import { slangs } from './slangs';

export const processMarkdown = (markdown: string, limit: number) => {
  let processContent = markdown.replace(/!\[.*?\]\(.*?\)/g, '');
  processContent = processContent.replace(/```[\s\S]*?```/g, '');
  processContent = processContent.replace(/``[\s\S]*?``/g, '');
  processContent = processContent.replace(/`[\s\S]*?`/g, '');
  processContent = markdownFilterSlang(processContent);
  processContent = markdownCutText(processContent, limit);

  return processContent;
};

export const markdownFilterSlang = (text: string): string => {
  let filteredSlang = text;
  slangs.forEach((word) => {
    const regex = new RegExp(word, 'gi');
    filteredSlang = filteredSlang.replace(regex, '\\*\\*');
  });
  return filteredSlang;
};

export const markdownCutText = (text: string, limit: number): string => {
  let cutText = text.length > limit ? text.slice(0, limit) + '...' : text;
  return cutText;
};

export const filterSlang = (text: string): string => {
  let filteredSlang = text;
  slangs.forEach((word) => {
    const regex = new RegExp(word, 'gi');
    filteredSlang = filteredSlang.replace(regex, `**`);
  });
  return filteredSlang;
};

export const cutText = (text: string, limit: number): string => {
  let cutText = text.length > limit ? text.slice(0, limit) + '...' : text;

  cutText = filterSlang(cutText);
  return cutText;
};
