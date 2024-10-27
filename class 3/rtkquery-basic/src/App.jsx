import { BrowserRouter, Route, Routes } from "react-router-dom";
import Team from "./features/team/Team.jsx";
import SingleTeam from "./features/team/SingleTeam.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Team />} />
          <Route path="/team/:id" element={<SingleTeam />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
