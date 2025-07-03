import { BrowserRouter, Routes, Route } from "react-router-dom";
import Workspace from "./page/Workspace";
import { Toaster } from "sonner";
import Landing from './page/Landing'
function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-center" />
      <Routes>
        <Route path="/workspace" element={<Workspace />} />
        <Route path="/" element={<Landing/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
