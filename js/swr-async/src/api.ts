import useSWR from "swr";

export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
};

const key = "http://jsonplaceholder.typicode.com/users";

export const useUsers = () => {
  const { mutate, ...rest } = useSWR<User[]>(key);

  const update = (index: number, newName: string) => {
    mutate(
      async (old) => {
        if (old === undefined) {
          return old;
        }

        return [
          ...old.slice(0, index),
          {
            ...old[index],
            name: newName,
          },
          ...old.slice(index + 1),
        ];
      },
      { revalidate: false }
    );
  };
  const reset = () => {
    // delete cache and revalidate
    mutate(async () => undefined);
  };

  return { update, reset, ...rest };
};
