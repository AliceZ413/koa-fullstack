export type RemixUserContext = {
  isLogIn: boolean;
  username: string;
};

export type RemixLoaderContext = {
  user: RemixUserContext;
};
