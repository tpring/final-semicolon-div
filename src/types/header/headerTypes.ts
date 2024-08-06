export type NavLinksProps = {
  getLinkClasses: (path: string) => string;
};

export type UserMenuProps = {
  isLoggedIn: boolean;
  userData: {
    profile_image?: string | null;
  } | null;
};
