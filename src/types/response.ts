export interface ICharacter extends IEntity {
  episode: Array<string>;
  gender: string;
  image: string;
  type: string;
  location: {
    name: string;
    url: string;
  };
  url: string;
  origin: {
    name: string;
    url: string;
  };
  species: string;
  status: string;
}

export interface IResponse {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
}
interface IEntity {
  id: number;
  name: string;
  created: string;
}
export interface IEpisode extends IEntity {
  air_date: string;
  episode: string;
  characters: string[];
  url: string;
}
