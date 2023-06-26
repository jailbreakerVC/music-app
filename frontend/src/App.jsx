import { Search } from "./components/search";
import { Home } from "./components/home";
import { Results } from "./components/results";
import Loader from "./components/loader";
import { useEffect, useState } from "react";
import "./App.css";
import { stringify } from "postcss";

function App() {
  const [home, setHome] = useState(true);
  const [search, setSearch] = useState(false);
  const [results, setResults] = useState();
  const [Loading, setLoading] = useState(false);
  return (
    <>
      <Loader Loading={Loading} />
      <Home home={home} showHome={setHome} showSearch={setSearch} />
      <Search
        showSearch={setSearch}
        search={search}
        setResults={setResults}
        results={results}
        setLoading={setLoading}
      />
      <h1 className="h1">Here are some music that you can use:</h1>
      <div className="grid grid-cols-3 gap-5">
        <Results data={results} />
      </div>
    </>
  );
}

export default App;
