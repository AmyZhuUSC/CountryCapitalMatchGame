import logo from './logo.svg';
import './App.css';
import GameMatch from "./GameMatch";
import Pagination from "./Pagination";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <GameMatch />
        <Pagination />
      </header>
    </div>
  );
}

export default App;
