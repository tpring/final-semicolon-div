import { slangs } from './slangs';

export const isNicknameValid = (nickname: string): boolean => {
  return !slangs.some((slangs) => nickname.includes(slangs));
};
