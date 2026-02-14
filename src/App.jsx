import { useEffect } from "react";

import "./App.css";
import AppRouter from "./routes/AppRouter";

function App() {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Tab") {
        e.preventDefault();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return <AppRouter />;
}

export default App;
