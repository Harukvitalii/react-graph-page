import react  from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import TablePage from './TablePage';
import GraphPage from './GraphPage';
import SingleRecordPage from './SingleRecord'


function App() {
  return (
    <Router>
      <div>
        {/* Navigation */}
        <nav>
          <ul>
            <li>
              <Link to="/">Nav ^ ^</Link>
            </li>
            <li>
              <Link to="/table">Auto Table</Link>
            </li>
            <li>
              <Link to="/graph">Graph</Link>
            </li>
            <li>
              <Link to="/singleRecord">Best Price Now</Link>
            </li>
          </ul>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/table" element={<TablePage />} />
          <Route path="/singleRecord" element={<SingleRecordPage />} />
        </Routes>
      </div>
    </Router>
  );
}

function HomePage() {
  return <h1>Navigator Page ^ ^</h1>;
}

export default App;