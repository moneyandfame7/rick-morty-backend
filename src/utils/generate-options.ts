import { PossibleOptions } from '../types/filters.js';
import _ from 'lodash';

export default function filterData(options: PossibleOptions, model: string) {
  const basic = {
    id: options.id,
    name: options.name,
  };
  switch (model) {
    case 'Character':
      return {
        where: _.omitBy(
          {
            ...basic,
            status: options.status,
            species: options.species,
            type: options.type,
            gender: options.gender,
          },
          _.isNil
        ),
      };
    case 'Episode':
      return {
        where: _.omitBy({
          ...basic,
          episode: options.episode,
        }),
      };
    case 'Location':
      return {
        where: _.omitBy({
          ...basic,
          type: options.type,
          dimension: options.dimension,
        }),
      };
  }
}
