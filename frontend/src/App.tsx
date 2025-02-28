import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import Landing from "./pages/Landing";
import Login from "./pages/Login";

import { DashboardLayout } from "./components/DashboardLayout"; 
import { GenerateGraphs } from "./components/GenerateGraphs";
import { LatexDocs } from "./components/LatexDocs";            
import Documentation from "./components/Documentation";
import GitCodeDocumentation from "./components/GitCodeDocumentation";
import RequireAuth from "./RequireAuth";

function App() {
  return (
    <div className="w-full h-full">
      <Routes>
     
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/signup" element={<Signup />} /> */}

       
        <Route path="/app" element={<RequireAuth><DashboardLayout /></RequireAuth>}>
          <Route index element={<Navigate to="graphs" replace />} />
          <Route path="graphs" element={<RequireAuth><GenerateGraphs /></RequireAuth>} />
          <Route path="docs" element={<RequireAuth><LatexDocs /></RequireAuth>} />
          <Route path="codedocs" element={<RequireAuth><Documentation /></RequireAuth>} />
          <Route path="gitcodeassist" element={<RequireAuth><GitCodeDocumentation /></RequireAuth>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
