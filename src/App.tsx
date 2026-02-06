import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import Fixtures from "./pages/fixtures";
import MatchDetails from "./pages/match_details";
import Layout from "./components/Layout";

const App = () => {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Fixtures />} />
          <Route path="/match/:id" element={<MatchDetails />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
};

export default App;
