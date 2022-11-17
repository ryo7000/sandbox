import React, { useCallback } from "react";
import { useUsers } from "./api";

export function Users() {
  const { data, isLoading, update, reset } = useUsers();

  const onInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    update(0, e.target.value);
  }, []);

  if (isLoading) {
    return null;
  }

  return (
    <>
      <div>
        {data?.map((user) => (
          <div key={user.id}>name: {user.name}</div>
        ))}
      </div>
      <input type="text" onInput={onInput} />
      <input type="button" value="reload" onClick={() => reset()} />
    </>
  );
}
