import { wrapPromise } from "./promise";
import { User } from "./store/user";

const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

const getUsers = async () => {
  await sleep(1000);
  const response = await fetch("http://jsonplaceholder.typicode.com/users");
  return (await response.json()) as User[];
};

export const getUser = () => {
  const users = getUsers();
  return wrapPromise(users);
};
