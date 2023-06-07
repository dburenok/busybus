import "./App.css";
import { BusMap } from "./components/BusMap";

function App() {
  return (
    <div className="App">
      <h1>BusyBus</h1>
      <div className="map">
        <BusMap />
      </div>
    </div>
  );
}

export default App;
