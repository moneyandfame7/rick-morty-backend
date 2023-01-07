// import ApiServerConfig from '../config/api-config.js';
// import CharacterController from './controllers/character-controller.js';
// import EpisodeController from './controllers/episode-controller.js';
// import express from 'express';
//
// abstract class Endpoints {
//   static main: () => void;
//   static characters: () => void;
//   static episodes: () => void;
//   static locations: () => void;
//   static error: () => void;
// }
//
// const router = express.Router();
// const charactersController = new CharacterController();
// const episodesController = new EpisodeController();
//
// export class Router extends Endpoints {
//   public static main() {}
//
//   public static characters() {
//     router.get('/characters', charactersController.all);
//
//     router.get('/characters/:id', charactersController.find);
//
//     router.get('/characters', charactersController.create);
//
//     return router;
//   }
//
//   public static episodes() {
//
//
//     return router;
//   }
//
//   // public static locations(){
//   //   ServerApplication.app.get('/locations', locationsController.all);
//   //
//   //   ServerApplication.app.get('/locations/:id', locationsController.find)
//   //
//   //   ServerApplication.app.get('/locations', locationsController.create)
//   // }
//
//   //
//   // public static error(){
//   //   ServerApplication.app.get('/error',errorHandler)
//   // }
// }
