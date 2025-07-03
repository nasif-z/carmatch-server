import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  function handlePressEnter(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key !== "Enter") return;
    navigate(`/search?query=${encodeURIComponent(query)}`);
  }
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse gap-8">
        <img
          src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1966&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          className="max-w-md rounded-lg shadow-2xl"
          width={500}
          height={500}
        />

        <div className="text-center">
          <h1 className="text-5xl font-bold">1000's of car rentals!</h1>
          <p className="py-6 text-3xl italic">Find Yours</p>

          <div className="flex justify-center lg:justify-start">
            <label className="input input-bordered flex items-center gap-2 w-full max-w-md">
              <svg
                className="h-5 w-5 opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.3-4.3"></path>
                </g>
              </svg>
              <input
                type="search"
                className="grow"
                placeholder="Find your car"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handlePressEnter}
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
