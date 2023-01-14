import _ from 'lodash';
import { Op } from 'sequelize';
import ApiServerConfig from '../config/api-config.js';
export default function filterData(options, model) {
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
                where: _.omitBy({
                    ...basic,
                    status: options.status,
                    species: options.species,
                    type: options.type,
                    gender: options.gender,
                }, _.isNil),
                ...order,
                limit,
                offset,
            };
        case 'Episode':
            return {
                where: _.omitBy({
                    ...basic,
                    episode: options.episode,
                }, _.isNil),
                ...order,
                limit,
                offset,
            };
        case 'Location':
            return {
                where: _.omitBy({
                    ...basic,
                    type: options.type,
                    dimension: options.dimension,
                }, _.isNil),
                ...order,
                limit,
                offset,
            };
    }
}
export const pagination = (options, data, objectsName) => {
    const maxLimit = 20;
    const page = options.page;
    const limit = options?.limit || maxLimit;
    const pages = Math.ceil(options.count / limit);
    const prev = options.page === 1 ? null : options.page - 1;
    const next = options.page === pages ? null : options.page + 1;
    const queryString = (newPage) => _.replace(options.otherQuery, `?page=${page}`, `?page=${newPage}`);
    return {
        info: {
            current: options.page,
            count: options.count,
            pages,
            prev: prev
                ? `${ApiServerConfig.BASE_URL}${options.otherQuery === `/api/${objectsName}` ? `/api/${objectsName}?page=${prev}` : queryString(prev)}`
                : null,
            next: next
                ? `${ApiServerConfig.BASE_URL}${options.otherQuery === `/api/${objectsName}` ? `/api/${objectsName}?page=${next}` : queryString(next)}`
                : null,
            limit,
        },
        data: data,
    };
};
