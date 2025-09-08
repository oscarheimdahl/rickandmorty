export type Character = {
  id: number;
  name: string;
  image: string;
  gender: 'male' | 'female' | 'unknown';
  status: 'Alive' | 'Dead' | 'unknown';
  species: string;
  type: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
};

export type Location = {
  id: number;
  name: string;
  dimension: string;
  residents: string[];
  type: string;
};

export type Episode = {
  id: number;
  name: string;
  air_date: string;
  characters: string[];
  episode: string;
};

type PageInfo = {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
};

export type CharactersResponse = {
  info: PageInfo;
  results: Character[];
};

export type LocationsResponse = {
  info: PageInfo;
  results: Location[];
};

export type EpisodesResponse = {
  info: PageInfo;
  results: Episode[];
};
