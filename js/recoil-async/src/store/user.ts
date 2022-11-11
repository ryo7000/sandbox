import { useEffect } from "react";
import { atom, selector, useRecoilState } from "recoil";
import {} from "recoil";
import { sleep } from "./util";

export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
};

const users = atom<User[]>({
  key: "atom/user",
  default: [],
});

const fetchUser = selector<User[]>({
  key: "selector/user",
  get: async ({ get }) => {
    const cur = get(users);
    if (cur.length !== 0) {
      return cur;
    }

    await sleep(1000);
    const response = await fetch("http://jsonplaceholder.typicode.com/users");
    return (await response.json()) as User[];
  },
  set: ({ set }, newValue) => set(users, newValue),
});

export const useUser = () => {
  const [users, setUsers] = useRecoilState(fetchUser);
  useEffect(() => {
    setUsers(users);
  }, [users]);
  const refresh = () => setUsers([]);
  return { users, refresh };
};
