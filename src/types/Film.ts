export interface FilmsData {
  count: number;
  next: null;
  previous: null;
  results: Film[];
}

export type Film = {
  id: number;
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: string;
  characters: number[];
  planets: number[];
  starships: number[];
  vehicles: number[];
  species: number[];
  created: Date;
  edited: Date;
  url: string;
};
