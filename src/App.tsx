import "./App.css";
import Table from "./Table/Table";
import TableV7 from "./TableV7/TableV7";
import { HashRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Table />} />
          <Route path="/v7" element={<TableV7 />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
