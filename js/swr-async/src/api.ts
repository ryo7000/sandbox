import { getSWRDefaultKey } from "@aspida/swr";
import aspida from "@aspida/fetch";
import api from "./api/$api";
import useSWR from "swr";

export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
};

export const useUsers = () => {
  const client = api(aspida());
  // useAspidaSWRを使うとSWRConfigの設定値が無視されてしまう
  // https://github.com/aspida/aspida/issues/737
  const { mutate, ...rest } = useSWR(
    getSWRDefaultKey(client.users, "get"),
    client.users.$get
  );

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
