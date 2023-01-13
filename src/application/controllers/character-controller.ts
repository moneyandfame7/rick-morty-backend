import { Request, Response } from 'express';
import CharacterService from '../services/character-service.js';
import { BadRequestError, InternalError, NotFoundError } from '../api-error.js';
import filterData, { pagination } from '../../utils/generate-options.js';
import EpisodeService from '../services/episode-service.js';
import { GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import pkg from 'env-var';
import { getIdFromUrl } from '../../utils/getId.js';
import S3Bucket from '../../config/s3-config.js';
import sharp from 'sharp';
import { CreationAttributes } from 'sequelize';
import { Character } from '../../types/models/character.js';

const { get } = pkg;

class CharacterController {
  public async create(req: Request, res: Response) {
    console.log(req.body, 'body');
    console.log(req.file, 'file');
    const fileBuffer = await sharp(req.file!.buffer).resize({ height: 300, width: 300, fit: 'cover' }).toBuffer();
    const params = {
      Bucket: S3Bucket.bucketName,
      Key: req.file!.originalname,
      Body: fileBuffer,
      ContentType: req.file!.mimetype,
    };
    const command = new PutObjectCommand(params);
    await S3Bucket.s3.send(command);
    const charAttributes: CreationAttributes<Character> = {
      name: req.body.name || 'New Character',
      status: req.body.status || 'Alive',
      species: req.body.species || 'Human',
      type: req.body.type || ' ',
      gender: req.body.gender || 'Male',
      image: req.file!.originalname,
      created_at: new Date(),
    };
    // Baby Mouse Skin Morty
    const character = await CharacterService.create(charAttributes);
    res.send(character);
  }

  public async findById(req: Request, res: Response) {
    const id = Number(req.params.id);
    console.log(id);
    if (!id) {
      throw new BadRequestError('Invalid ID.');
    }

    const character = await CharacterService.findById(id);

    if (!character) {
      throw new NotFoundError(`Character with ID ${id} not found`);
    }
    const getObjectParams = {
      Bucket: get('BUCKET_NAME').default('rick-morty-images').asString(),
      Key: character.id + '.jpeg',
    };
    const command = new GetObjectCommand(getObjectParams);
    const url = await getSignedUrl(S3Bucket.s3, command, { expiresIn: 3600 });
    character.image = url;
    return res.send(character);
  }

  public async findAll(req: Request, res: Response) {
    const filters = filterData(req.query as any, 'Character');
    const characters = await CharacterService.findAll(filters);
    if (characters) {
      // for (const character of characters.rows) {
      //   const getObjectParams = {
      //     Bucket: get('BUCKET_NAME').default('rick-morty-images').asString(),
      //     Key: character.id + '.jpeg',
      //   };
      //   const command = new GetObjectCommand(getObjectParams);
      //   const url = await getSignedUrl(S3Bucket.s3, command, { expiresIn: 3600 });
      //   character.image = url;
      // }
      const result = pagination(
        {
          page: Number(req.query.page),
          otherQuery: req.originalUrl,
          count: characters.count,
          limit: Number(req.query.limit || 20),
        },
        characters.rows,
        'characters'
      );
      res.send(result);
    } else {
      throw new NotFoundError('Characters not foundd');
    }
  }

  public async findByEpisode(req: Request, res: Response) {
    const id = Number(req.query.id);
    if (!id) {
      throw new BadRequestError('Invalid character id.');
    }
    const characters = await CharacterService.findAllByEpisode(id);
    if (characters) {
      return res.send(characters);
    }
    throw new NotFoundError('No characters with this episode id is not foundd');
  }
}

export default new CharacterController();
