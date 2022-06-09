/** Dependencies */
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

/** Styles */
import './App.scss';

/** Screens */
import AddLinkPage from './screens/AddLinkPage/AddLinkPage';
import HomePage from './screens/HomePage/HomePage';
import ResultPage from './screens/ResultPage/ResultPage';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/add-link" element={<AddLinkPage />} />
          <Route path="/result-page" element={<ResultPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
