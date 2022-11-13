import { Suspense } from "react";
import { Users } from "./Users";

function App() {
  return (
    <div className="App">
      <Suspense fallback={<div>loading...</div>}>
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
