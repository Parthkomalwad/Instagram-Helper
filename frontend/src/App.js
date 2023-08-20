import './App.css';
import { Route, Routes, BrowserRouter } from "react-router-dom";
import MainPage from './component/mainPage';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<MainPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
