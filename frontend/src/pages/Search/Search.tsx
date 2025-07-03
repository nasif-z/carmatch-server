import { useEffect, useState } from "react";
import { api } from "../../api";
import type { CarCard } from "../Home/Cards";
import Card from "../Home/Card";
import { useSearchParams } from "react-router-dom";

export default function Search() {
  const [query, setQuery] = useState("");
  const [cars, setCars] = useState<CarCard[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  // This useEffect will update the 'query' state when the URL's 'query' parameter changes.
  useEffect(() => {
    const loadedQuery = searchParams.get("query");
    setQuery(loadedQuery ? loadedQuery : "");
    // console.log("Query from URL:", loadedQuery); // You can log here to see the immediate value
  }, [searchParams]); // Depend on searchParams to re-run when URL changes

  // This useEffect will fetch results whenever the 'query' state changes.
  // This handles both manual input and URL changes.
  useEffect(() => {
    const fetchResults = async () => {
      if (!query) {
        setCars([]); // Clear results if query is empty
        return;
      }
      setLoading(true);
      try {
        const res = await api.get(`/cars/?keyword=${query}`);
        setCars(res.data);
      } catch (err) {
        console.error("Failed to fetch cars:", err);
      } finally {
        setLoading(false);
      }
    };

    setSearchParams({ query: query });
    fetchResults(); // Call fetchResults when query changes
  }, [query]); // Depend on 'query' to refetch when it updates

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="max-w-6xl mx-auto p-6 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">Search Cars</h1>

      <form onSubmit={handleSearch} className="flex gap-3 mb-8 justify-center">
        <input
          type="text"
          placeholder="Search by model or location..."
          className="input input-bordered w-full max-w-md"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="btn btn-neutral" type="submit">
          Search
        </button>
      </form>

      {loading ? (
        <div className="text-center text-lg">Searching...</div>
      ) : cars.length === 0 ? (
        <div className="text-center text-gray-500">No cars found.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cars.map(
            (car) => car.is_available && <Card key={car.id} card={car} />
          )}
        </div>
      )}
    </div>
  );
}
