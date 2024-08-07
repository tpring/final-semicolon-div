import { slangs } from './slangs';

export const isNicknameValid = (nickname: string): boolean => {
  return !slangs.some((slangs) => nickname.includes(slangs));
};

export const isSearchValid = (keyword: string): boolean => {
  return !slangs.some((slangs) => keyword.includes(slangs));
};
