import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Country from "./Country";
import State from "./State";
import District from "./District";
import Employee from "./Employee";

function App() {
  return (
    <BrowserRouter>
  <h1>Aditee Infotech</h1>
      <nav>
        <Link to="/home">Home</Link> &nbsp;&nbsp;
        <Link to="/country">Country</Link>&nbsp;&nbsp;
        <Link to="/state">State</Link> &nbsp;&nbsp;               
        <Link to="/district">District</Link>&nbsp;&nbsp;
        <Link to="/employee">Employee</Link>
      </nav>

       <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/country" element={<Country />} />
          <Route path="/state" element={<State />} />
          <Route path="/district" element={<District />} />                              
          <Route path="/employee" element={<Employee />} />
        </Routes>

    </BrowserRouter>
  );
}
export default App;