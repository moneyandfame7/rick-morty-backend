interface IEpisodeObj {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  created_at: Date;
  url: string;
}

interface ICharacterObj {
  id?: number;
  name: string;
  created_at: Date;
  url: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  image: string;
}

const episodesObj: IEpisodeObj[] = [];
const characterObj: ICharacterObj[] = [];
// const responseEpisode = await fetchData<IEpisode>('https://rickandmortyapi.com/api/episode');
// responseEpisode.map((episode) => {
//   episodesObj.push({
//     // characters: episode.characters,
//     id: episode.id,
//     name: episode.name,
//     air_date: episode.air_date,
//     episode: episode.episode,
//     created_at: new Date(),
//     url: `${process.env.BASE_URL}/episodes/${episode.id}`,
//   });
// });
// const _episodes = await Episode.bulkCreate(episodesObj);
//
// const responseCharacter = await fetchData<ICharacter>('https://rickandmortyapi.com/api/character');
// responseCharacter.map((character) => {
//   characterObj.push({
//     name: character.name,
//     gender: character.gender,
//     status: character.status,
//     url: `${process.env.BASE_URL}/episodes/${character.id}`,
//     image: character.image,
//     species: character.species,
//     type: character.type,
//     created_at: new Date(),
//   });
// });
// const _characters = await Character.bulkCreate(characterObj);
// !!!
// res.send(_episodes);
// for (let i = 0; i < _episodes.length; i++) {
//   for (let j = 0; j < responseEpisode[i].characters.length; j++) {
//     const response = await makeConcurrentRequest(responseEpisode[i].characters);
//
//     _episodes[i].addCharacters(response[j].id);
//   }
// }

// !!!
// for (let i = 0; i < responseEpisode.length; i++) {
//   for (let j = 0; j < responseEpisode[i].characters.length; j++) {
//     const characterId = getIdFromUrl(responseEpisode[i].characters[j]);
//     await episodeDbController.addCharacter(_episodes[i].id, characterId);
//   }
// }
// const __episodes = await episodeDbController.findAll();
// res.send(__episodes);
