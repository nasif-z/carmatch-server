import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../api";
import type { CarCard } from "../Home/Cards";

interface Review {
  id: number;
  owner: number;
  car: number;
  created_at: string;
  updated_at: string;
  stars: number;
  comment: string;
}

export default function SingleCar() {
  const { id } = useParams();
  const [car, setCar] = useState<CarCard | null>(null);
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState<any[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newReview, setNewReview] = useState({ stars: 5, comment: "" });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    async function fetchCar() {
      try {
        const response = await api.get<CarCard>(`/cars/${id}/`);
        setCar(response.data);
      } catch (err) {
        console.error("Failed to fetch car details", err);
      } finally {
        setLoading(false);
      }
    }

    fetchCar();
  }, [id]);

  useEffect(() => {
    async function fetchImages() {
      try {
        const response = await api.get(`/cars/${id}/images/`);
        setImages(response.data);
      } catch (err) {
        console.error("Failed to get images", err);
      }
    }

    fetchImages();
  }, [id]);

  useEffect(() => {
    async function fetchReviews() {
      try {
        const response = await api.get<Review[]>(`/cars/${id}/reviews/`);
        setReviews(response.data);
      } catch (err) {
        console.error("Failed to fetch reviews", err);
      }
    }

    fetchReviews();
  }, [id]);

  const handleDeleteReview = async (reviewId: number) => {
    try {
      await api.delete(`/reviews/${reviewId}/`);
      setReviews(reviews.filter((review) => review.id !== reviewId));
    } catch (err) {
      console.error("Failed to delete review", err);
    }
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;

    try {
      setSubmitting(true);
      await api.post(`/cars/${id}/reviews/`, {
        stars: newReview.stars,
        comment: newReview.comment,
      });

      const refreshed = await api.get<Review[]>(`/cars/${id}/reviews/`);
      setReviews(refreshed.data);
      setNewReview({ stars: 5, comment: "" });
    } catch (err) {
      console.error("Failed to submit review", err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="text-center pt-20 text-lg">Loading...</div>;
  }

  if (!car) {
    return <div className="text-center pt-20 text-red-500">Car not found.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="card bg-base-100 shadow-xl">
        <figure className="aspect-video w-full overflow-hidden rounded-t-xl">
          <img
            src={images.find((img) => img.is_thumbnail)?.image || ""}
            alt={car.car_model}
            className="w-full h-full object-cover"
          />
        </figure>

        <div className="card-body">
          <h2 className="card-title text-2xl">{car.car_model}</h2>
          <p className="text-gray-500">{car.description}</p>
          <div className="mt-4 flex flex-wrap gap-4 text-sm">
            <span className="badge badge-outline">
              Location: {car.location}
            </span>
            <span className="badge badge-outline">
              Available: {car.is_available ? "Yes" : "No"}
            </span>
            <span className="badge badge-outline">
              Tk {car.price_per_day}/day
            </span>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-3">
            {car.images.map((img) => (
              <img
                key={img.id}
                src={img.image}
                alt="car"
                className="rounded-lg h-24 w-full object-cover"
              />
            ))}
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-3">Reviews</h3>
        {reviews.length === 0 ? (
          <p className="text-gray-500">No reviews yet.</p>
        ) : (
          <div className="space-y-3">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="bg-base-200 p-4 rounded-lg border border-base-300"
              >
                <div className="flex justify-between">
                  <span className="font-semibold">⭐ {review.stars}</span>
                  <span className="text-xs text-gray-400">
                    {new Date(review.created_at).toLocaleDateString()}
                  </span>
                </div>
                <p className="mt-2">{review.comment}</p>
                <button
                  className="btn btn-soft btn-secondary"
                  onClick={() => handleDeleteReview(review.id)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="mt-10">
        <h3 className="text-xl font-semibold mb-2">Add Your Review</h3>
        <form
          onSubmit={handleReviewSubmit}
          className="bg-base-200 p-4 rounded-lg space-y-3 border border-base-300"
        >
          <label className="label">
            <span className="label-text">Rating</span>
          </label>
          <select
            className="select select-bordered w-full"
            value={newReview.stars}
            onChange={(e) =>
              setNewReview((prev) => ({
                ...prev,
                stars: parseInt(e.target.value),
              }))
            }
          >
            {[5, 4, 3, 2, 1].map((star) => (
              <option key={star} value={star}>
                {star} Star{star > 1 && "s"}
              </option>
            ))}
          </select>

          <label className="label">
            <span className="label-text">Comment</span>
          </label>
          <textarea
            className="textarea textarea-bordered w-full"
            rows={3}
            placeholder="Write your thoughts..."
            value={newReview.comment}
            onChange={(e) =>
              setNewReview((prev) => ({ ...prev, comment: e.target.value }))
            }
            required
          ></textarea>

          <button
            className="btn btn-neutral"
            type="submit"
            disabled={submitting}
          >
            {submitting ? "Submitting..." : "Submit Review"}
          </button>
        </form>
      </div>
    </div>
  );
}
