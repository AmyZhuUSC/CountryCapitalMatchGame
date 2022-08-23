import logo from './logo.svg';
import './App.css';
import GameMatch from "./GameMatch";
import Pagination from "./Pagination";
import Puzzles from './Puzzles';

function App() {
// for Puzzles
  let initValues = Array.from({ length: 16 }, (_, i) => i);
  let ending = false;

  function onSolveCallback(value) {
    if (value === true) {
      ending = true;
    }
  }
  return (
    <div className="App">
      <header className="App-header">
        <GameMatch />
        <Pagination />
        <Puzzles
        initialConfiguration={initValues}
        onSolveCallback={onSolveCallback()}
      />
      <div style={{ display: ending === true ? "block" : "none" }}>
        Congratuations
      </div>
      </header>
    </div>
  );
}

export default App;
