import { useQuery, useQueryClient } from "@tanstack/react-query";

export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
};

const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

const fetchUsers = async (): Promise<User[]> => {
  await sleep(1000);
  const res = await fetch("http://jsonplaceholder.typicode.com/users");
  if (!res.ok) {
    throw new Error("response was not ok");
  }

  return res.json();
};

export const useUsers = () => {
  const result = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });
  const data = result.data;
  const { data: _, ...rest } = result;

  const queryClient = useQueryClient();
  const update = (index: number, newName: string) => {
    queryClient.setQueryData<User[]>(["users"], (old) => {
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
    });
  };
  const reset = () => {
    queryClient.resetQueries({ queryKey: ["users"] });
  };

  return { data, update, reset, ...rest };
};
