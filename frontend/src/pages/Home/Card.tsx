import type { CarCard } from "./Cards";

interface CardProp {
  card: CarCard;
}

export default function Card({ card }: CardProp) {
  const thumbnail = card.images.find((image) => image.is_thumbnail);

  return (
    <div className="card w-96 bg-base-100 shadow-xl border border-gray-200 hover:scale-[1.02] transition-transform">
      <figure className="h-48 overflow-hidden">
        <img
          src={thumbnail?.image}
          alt={`Image of ${card.car_model}`}
          className="w-full h-full object-cover"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-lg font-semibold">{card.car_model}</h2>
        <p className="text-sm text-gray-500">{card.description}</p>
        <div className="flex justify-between items-center mt-4">
          <div className="badge badge-secondary">{card.location}</div>
          <div className="text-right text-primary font-semibold">
            Tk {card.price_per_day}
            <span className="text-xs text-gray-400"> /day</span>
          </div>
        </div>
        <div className="card-actions justify-end mt-4">
          <button
            className="btn btn-sm btn-primary"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}
