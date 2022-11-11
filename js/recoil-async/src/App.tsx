import { Suspense } from "react";
import { RefreshButton } from "./RefreshButton";
import { Users } from "./Users";

function App() {
  return (
    <div className="App">
      <Suspense fallback={<div>loading...</div>}>
        <RefreshButton />
        <div>
          <div>users</div>
          <Users />
        </div>
        <div>
          <div>users2</div>
          <Users />
        </div>
      </Suspense>
    </div>
  );
}

export default App;
