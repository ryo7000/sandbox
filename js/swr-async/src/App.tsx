import { Suspense } from "react";
import { Users } from "./Users";

function App() {
  return (
    <Suspense fallback={<div>loading...</div>}>
      <div className="App">
        <div>
          <div>users</div>
          <Users />
        </div>
        <div>
          <div>users2</div>
          <Users />
        </div>
      </div>
    </Suspense>
  );
}

export default App;
