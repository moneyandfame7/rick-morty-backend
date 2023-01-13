import { PossibleOptions } from '../types/filters.js';
import _ from 'lodash';
import { Op } from 'sequelize';

export default function filterData(options: PossibleOptions, model: string) {
  const order = { order: [['id', options.order || 'ASC']] };
  const checkId = typeof options.id === 'string' ? options.id.split(',').map((id) => parseInt(id)) : options.id;
  const basic = {
    id: checkId,
    name: options.name
      ? {
          [Op.iLike]: `%${options.name}%`,
        }
      : undefined,
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
        ...order,
      };
    case 'Episode':
      return {
        where: _.omitBy(
          {
            ...basic,
            episode: options.episode,
          },
          _.isNil
        ),
        ...order,
      };
    case 'Location':
      return {
        where: _.omitBy(
          {
            ...basic,
            type: options.type,
            dimension: options.dimension,
          },
          _.isNil
        ),
        ...order,
      };
  }
}
