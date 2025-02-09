import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import { DashboardLayout } from "./components/DashboardLayout"; 
import { GenerateGraphs } from "./components/GenerateGraphs";
import { LatexDocs } from "./components/LatexDocs";            
import Documentation from "./components/Documentation";
import GitCodeDocumentation from "./components/GitCodeDocumentation";

function App() {
  return (
    <div className="w-full h-full">
      <Routes>
     
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

       
        <Route path="/app" element={<DashboardLayout />}>
          <Route index element={<Navigate to="graphs" replace />} />
          <Route path="graphs" element={<GenerateGraphs />} />
          <Route path="docs" element={<LatexDocs />} />
          <Route path="codedocs" element={<Documentation />} />
          <Route path="gitcodeassist" element={<GitCodeDocumentation />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
