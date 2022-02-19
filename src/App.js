import "./App.css";
import "antd/dist/antd.css";
import { Login } from "./components/Login";
import { Navbar } from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import { EmployeeList } from "./components/EmployeeList";
import { EmployeeDetails } from "./components/EmployeeDetails";
import { Homepage } from "./components/Homepage";

function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Homepage></Homepage>}></Route>
        <Route path="/employees" element={<EmployeeList></EmployeeList>}>
          <Route path=":pages"></Route>
        </Route>
        <Route
          path="/profile"
          element={<EmployeeDetails></EmployeeDetails>}
        ></Route>
        <Route
          path="/profile/:id"
          element={<EmployeeDetails></EmployeeDetails>}
        ></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/register"></Route>
      </Routes>
    </div>
  );
}

export default App;
