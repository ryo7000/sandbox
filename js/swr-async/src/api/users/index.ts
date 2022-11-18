type User = {
  id: number;
  name: string;
  username: string;
  email: string;
};

export type Methods = {
  get: {
    resBody: User[];
  };
};
