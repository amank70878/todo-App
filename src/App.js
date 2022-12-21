import { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./Components/Navbar";
import Alert from "./Components/Alert";
import Home from "./Components/Home";

function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (msg, type) => {
    setAlert({
      msg: msg,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 2500);
  };
  return (
    <>
      <Navbar />
      <Alert alert={alert} />
      <Home showAlert={showAlert} />
    </>
  );
}

export default App;
