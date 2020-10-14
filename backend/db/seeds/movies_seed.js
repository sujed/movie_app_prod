exports.seed = function (knex) {
  return knex('movies')
    .del()
    .then(() => {
      return knex('movies').insert({
        name: 'The Land Before Time',
        genre: 'Fantasy',
        plot:
          'The films follow a friendship of a group of young dinosaurs by the names of Littlefoot (Apatosaurus), Cera (Triceratops), Ducky (Saurolophus), Petrie (Pteranodon), and Spike (Stegosaurus). After finding the Great Valley, they raise a carnivorous baby who they name Chomper, survive a drought, a cold snap, encounter aliens, and witness a solar eclipse. Throughout all films, they embark upon adventures, learning lessons about life and friendship along the way.',
        rating: 7,
        explicit: false,
      });
    })
    .then(() => {
      return knex('movies').insert({
        name: 'Jurassic Park',
        genre: 'Science Fiction',
        plot:
          "A pragmatic paleontologist visiting an almost complete theme park is tasked with protecting a couple of kids after a power failure causes the park's cloned dinosaurs to run loose.",
        rating: 9,
        explicit: true,
      });
    })
    .then(() => {
      return knex('movies').insert({
        name: 'Ice Age: Dawn of the Dinosaurs',
        plot:
          "When Sid's attempt to adopt three dinosaur eggs gets him abducted by their real mother to an underground lost world, his friends attempt to rescue him.",
        genre: 'Action/Romance',
        rating: 5,
        explicit: false,
      });
    });
};
