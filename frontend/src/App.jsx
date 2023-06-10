import { Search } from "./components/search";
import { Home } from "./components/home";
import { useState } from "react";
import "./App.css";

function App() {
  const [home, setHome] = useState(true);
  const [search, setSearch] = useState(false);

  return (
    <>
      <Home home={home} showHome={setHome} showSearch={setSearch} />
      <Search showSearch={setSearch} search={search} />
    </>
  );
}

export default App;
