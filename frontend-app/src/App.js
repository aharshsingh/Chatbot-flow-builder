import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Workspace from './page/Workspace'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Workspace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
