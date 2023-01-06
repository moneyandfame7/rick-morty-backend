import { CreationAttributes } from 'sequelize/types/index.js';
import { Character as CharacterType } from '../types/character.js';
import { Episode as EpisodeType } from '../types/episode.js';

export const characters: CreationAttributes<CharacterType>[] = [
  {
    name: 'Rick Sanchez',
    status: 'Alive',
    species: 'Human',
    type: '',
    gender: 'Male',
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
    url: 'https://rickandmortyapi.com/api/character/1',
    created_at: new Date(),
  },
  {
    name: 'Mr. Goldenfold',
    status: 'Alive',
    species: 'Cronenberg',
    type: '',
    gender: 'Male',
    image: 'https://rickandmortyapi.com/api/character/avatar/239.jpeg',
    url: 'https://rickandmortyapi.com/api/character/239',
    created_at: new Date(),
  },
  {
    name: 'Bill',
    status: 'Alive',
    species: 'Human',
    type: '',
    gender: 'Male',
    image: 'https://rickandmortyapi.com/api/character/avatar/45.jpeg',
    url: 'https://rickandmortyapi.com/api/character/45',
    created_at: new Date(),
  },
  {
    name: 'Morty Smith',
    status: 'Alive',
    species: 'Human',
    type: '',
    gender: 'Male',
    image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
    url: 'https://rickandmortyapi.com/api/character/2',
    created_at: new Date(),
  },
];

export const episodes: CreationAttributes<EpisodeType>[] = [
  {
    name: 'Pilot',
    air_date: 'December 2, 2013',
    episode: 'S01E01',
    url: 'https://rickandmortyapi.com/api/episode/1',
    created_at: new Date(),
  },
  {
    name: 'Lawnmower Dog',
    air_date: 'December 9, 2013',
    episode: 'S01E02',
    url: 'https://rickandmortyapi.com/api/episode/2',
    created_at: new Date(),
  },
];
