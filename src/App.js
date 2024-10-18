// src/App.js
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useParams,
} from "react-router-dom";
import SurveyPage from "./pages/SurveyPage";
import ThankYouPage from "./pages/ThankYouPage";

const SurveyPageWrapper = () => {
  const { id } = useParams();
  return <SurveyPage surveyId={parseInt(id, 10)} />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/survey/:id" element={<SurveyPageWrapper />} />
        <Route path="/thank-you" element={<ThankYouPage />} />
      </Routes>
    </Router>
  );
}

export default App;
