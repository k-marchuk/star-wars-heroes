export interface StarshipsData {
  count: number;
  next: string;
  previous: null;
  results: Starship[];
}

export interface Starship {
  id: number;
  name: string;
  model: string;
  manufacturer: string;
  cost_in_credits: string;
  length: string;
  max_atmosphering_speed: string;
  crew: string;
  passengers: string;
  cargo_capacity: string;
  consumables: string;
  hyperdrive_rating: string;
  MGLT: string;
  starship_class: string;
  pilots: number[];
  films: number[];
  created: Date;
  edited: Date;
  url: string;
}
