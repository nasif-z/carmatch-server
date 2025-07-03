interface CarCard {
  thumbnail: string;
  model: string;
  time: number;
  rate: number;
  location: string;
}

export const carCards: CarCard[] = [
  {
    thumbnail:
      "https://images.unsplash.com/photo-1621968175389-f1a0c0692cdc?q=80&w=1150&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    model: "Toyota Corolla 2020",
    time: 4,
    rate: 45,
    location: "Dhaka",
  },
  {
    thumbnail:
      "https://images.unsplash.com/photo-1654870645915-de8afa6b3b30?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    model: "Honda Civic 2019",
    time: 6,
    rate: 50,
    location: "Chittagong",
  },
  {
    thumbnail:
      "https://images.unsplash.com/photo-1677604133793-bf74b6fb2040?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    model: "Tesla Model 3",
    time: 2,
    rate: 120,
    location: "Sylhet",
  },
  {
    thumbnail:
      "https://images.unsplash.com/photo-1603553329474-99f95f35394f?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    model: "Ford Mustang",
    time: 3,
    rate: 100,
    location: "Khulna",
  },
  {
    thumbnail:
      "https://images.unsplash.com/photo-1609184166822-bd1f1b991a06?q=80&w=1199&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    model: "BMW X5",
    time: 5,
    rate: 95,
    location: "Rajshahi",
  },
  {
    thumbnail:
      "https://images.unsplash.com/photo-1707325653284-49057765e44c?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    model: "Hyundai Elantra",
    time: 7,
    rate: 40,
    location: "Barisal",
  },
];
