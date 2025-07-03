import Card from "./Card";
import { api } from "../../api";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export interface CarImage {
  id: number;
  uploaded_at: string;
  listing: number;
  image: string;
  is_thumbnail: boolean;
}

export interface CarCard {
  id: number;
  images: CarImage[];
  created_at: string;
  updated_at: string;
  is_available: boolean;
  car_model: string;
  description: string;
  location: string;
  price_per_day: string;
  owner: number;
}

export default function Cards() {
  const [carCards, setCarCards] = useState<CarCard[]>([]);
  useEffect(() => {
    async function getCards() {
      const response = await api.get("/cars/");
      setCarCards(response.data);
    }
    getCards();
  }, []);
  return (
    <div className="bg-white pt-7 grid grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-12 justify-items-center">
      {carCards.map(
        (car) =>
          car.is_available && (
            <Link to={`/car/${car.id}`}>
              <Card card={car} />
            </Link>
          )
      )}
    </div>
  );
}
