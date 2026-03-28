import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { ProblemStatementsPage } from './pages/ProblemStatementsPage';
import { ProjectSubmissionPage } from './pages/ProjectSubmissionPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/problems" element={<ProblemStatementsPage />} />
        <Route path="/submit" element={<ProjectSubmissionPage />} />
      </Routes>
    </Router>
  );
}

export default App;
