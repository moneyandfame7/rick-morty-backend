interface BasicFilters {
  id: number;
  name: string;
}

interface CharactersFilters {
  status: string;
  species: string;
  type: string;
  gender: string;
}

interface EpisodeFilters {
  episode: string;
  characters: Array<string> | string;
}

interface LocationFilters {
  type: string;
  dimension: string;
  residents: Array<string> | string;
}

export type PossibleOptions = BasicFilters & CharactersFilters & EpisodeFilters & LocationFilters;
