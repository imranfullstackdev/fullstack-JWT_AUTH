import "./App.css";
import Loginpage from "./component/Loginpage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Viewuser from "./component/Viewuser";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Loginpage />} />
          <Route path="Viewuser" element={<Viewuser />} />

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
