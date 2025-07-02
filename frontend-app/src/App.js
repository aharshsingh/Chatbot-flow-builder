import { BrowserRouter, Routes, Route } from "react-router-dom";
import Workspace from "./page/Workspace";
import { Toaster } from "sonner";

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-center" />
      <Routes>
        <Route path="/" element={<Workspace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
