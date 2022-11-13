import { getUser } from "./api";

const users = getUser();

export function Users() {
  const data = users.read();

  return (
    <div>
      {data.map((user) => (
        <div key={user.id}>name: {user.name}</div>
      ))}
    </div>
  );
}
