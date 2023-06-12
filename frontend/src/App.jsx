import { Search } from "./components/search";
import { Home } from "./components/home";
import { Results } from "./components/results";
import { useEffect, useState } from "react";
import "./App.css";
import { stringify } from "postcss";

function App() {
  const [home, setHome] = useState(true);
  const [search, setSearch] = useState(false);
  const [results, setResults] = useState();
  // useEffect(() => {
  //   for (result in results) {
  //     console.log("result: " + result);
  //   }
  //   // console.log("results:" + results);
  // }, [results]);

  return (
    <>
      <Home home={home} showHome={setHome} showSearch={setSearch} />
      <Search
        showSearch={setSearch}
        search={search}
        setResults={setResults}
        results={results}
      />
      <h1 className="h1">Here are some music that you can use:</h1>
      <div className="grid grid-cols-2 gap-10">
        <Results data={results} />
      </div>
    </>
  );
}

export default App;