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
      <div className="hero min-h-screen bg-slate-400 ">
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">What's the scene like?</span>
          </label>
          <div className="join">
            <form
              autoComplete="off"
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
              <input
                type="text"
                placeholder="...a fast car chase 🚗💨 "
                className="input input-bordered w-full max-w-xs join-item"
              />

              <button className="btn join-item"> search </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
