import React from "react";
import axios from "axios";

export function Search({
  showSearch,
  search,
  setResults,
  results,
  setLoading,
}) {
  if (search != false) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-semibold mb-4">Set the scene...</h2>
        <form
          onSubmit={async function handleSubmit(e) {
            e.preventDefault();
            try {
              setLoading(true);
              const scene = e.target[0].value;
              scene.replace(/\s/g, "+");
              const res = await axios.get(
                // `http://localhost:8000/generate/?scene=${e.target[0].value}`
                `http://localhost:8000/test`
              );
              console.log("res.data", res);
              setResults(res.data);
              showSearch(false);
              setLoading(false);
            } catch (err) {
              console.log(err);
            }
          }}
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            ></label>
            <input
              className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:border-indigo-500"
              type="text"
              id="name"
              name="name"
              placeholder="a fast car chase..."
              required
            />
          </div>
          <div className="flex justify-center">
            <button
              className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default Search;
