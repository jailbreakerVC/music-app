import React from "react";
export function Home({ home, showHome, showSearch }) {
  if (home == true) {
    return (
      <div className="hero ">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Music recommendation App </h1>
            <p className="py-6">
              This is a music recommendation app that uses Google bard and
              youtube API to get results
            </p>
            <button
              className="btn btn-primary"
              onClick={() => {
                showHome(false);
                showSearch(true);
              }}
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    );
  }
}
