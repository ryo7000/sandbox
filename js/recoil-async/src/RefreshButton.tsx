import { useCallback } from "react";
import { useUser } from "./store/user";

export function RefreshButton() {
  const { refresh } = useUser();

  const onClick = useCallback(() => {
    refresh();
  }, []);

  return <input type="button" value="reload" onClick={onClick} />;
}
