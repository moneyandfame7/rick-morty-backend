import { Pagination, PossibleOptions } from '../types/filters.js';
import _ from 'lodash';
import { Op } from 'sequelize';
import { CreationAttributes } from 'sequelize/types/index.js';
import { Character } from '../types/models/character.js';
import { Episode } from '../types/models/episode.js';
import { Location } from '../types/models/location.js';
import ApiServerConfig from '../config/api-config.js';

interface IFilterData {
  (options: PossibleOptions, model: string): any;
}

export default function filterData(this: any, options: PossibleOptions, model: string) {
  const order = { order: [['id', options.order || 'ASC']] };
  const page = options.page || 1;
  const limit = options.limit || 20;
  const offset = page * limit - limit;

  console.log(offset);
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
        limit,
        offset,
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
        limit,
        offset,
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
        limit,
        offset,
      };
  }
}

type PossibleData = Character[] | Location[] | Episode[];

export const pagination = (options: Pagination, data: PossibleData, objectsName: string) => {
  const maxLimit = 20;
  const page = options.page;
  const limit = options?.limit || maxLimit;
  const pages = Math.ceil(options.count / limit);
  const prev = options.page === 1 ? null : options.page - 1;
  const next = options.page === pages ? null : options.page + 1;

  const queryString = (page: number) => _.replace(options.otherQuery as string, `?page=${page}`, `?page=${page}`);

  return {
    info: {
      count: options.count,
      pages,
      prev: prev
        ? `${ApiServerConfig.BASE_URL}${
            options.otherQuery === `/api/${objectsName}` ? `/api/${objectsName}?page=${prev}` : queryString(prev)
          }`
        : null,
      next: next
        ? `${ApiServerConfig.BASE_URL}${
            options.otherQuery === `/api/${objectsName}` ? `/api/${objectsName}?page=${next}` : queryString(next)
          }`
        : null,
      limit,
    },
    data: data,
  };
};
