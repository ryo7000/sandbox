import { useUser } from "./store/user";

export function Users() {
  const { users } = useUser();

  return (
    <div>
      {users.map((user) => (
        <div key={user.id}>name: {user.name}</div>
      ))}
    </div>
  );
}
