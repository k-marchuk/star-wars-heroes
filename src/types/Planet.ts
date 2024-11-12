export interface PlanetsData {
  count: number;
  next: string;
  previous: null;
  results: Planet[];
}

export interface Planet {
  id: number;
  name: string;
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: string;
  population: string;
  residents: number[];
  films: number[];
  created: Date;
  edited: Date;
  url: string;
}
