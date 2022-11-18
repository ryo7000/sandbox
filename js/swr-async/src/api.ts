import useAspidaSWR from "@aspida/swr";
import aspida from "@aspida/fetch";
import api from "./api/$api";

export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
};

export const useUsers = () => {
  const client = api(aspida());
  const { mutate, ...rest } = useAspidaSWR(client.users);

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
