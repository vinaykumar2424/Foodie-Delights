import './App.css';
import Homepage from './components/jsFiles/Homepage';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Recipe from './components/jsFiles/Recipe';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/recipe/:id" element={<Recipe />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
