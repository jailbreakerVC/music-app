import React from "react";

export function Search({ showSearch, search }) {
  if (search != false) {
    return (
      <div className="hero min-h-screen bg-base-200">
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">What's the scene like?</span>
          </label>
          <div className="join">
            <input
              type="text"
              placeholder="...a fast car chase 🚗💨 "
              className="input input-bordered w-full max-w-xs join-item"
            />
            <button className="btn join-item"> search </button>
          </div>
        </div>
      </div>
    );
  }
}
