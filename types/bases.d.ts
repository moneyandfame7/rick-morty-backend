import { CreationOptional } from 'sequelize/types/index.js';
/**
 * Містить в собі поля, які є у всіх моделей
 * - id
 * - created_at
 * - name
 * - url
 *
 *  при створюванні моделі, робить id та created_at необовʼязковими
 * @example
 *  Model.create({
 *   name: "Alex",
 *   url: "https://example.com",
 *  })
 * */
export interface ResourceBases {
  id: CreationOptional<number>;
  created_at: CreationOptional<Date>;
  name: string;
  url: string;
}
