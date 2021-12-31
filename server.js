const express = require("express");
const app = express();
const path = require("path");
const Sequelize = require('sequelize');
const { STRING, INTEGER } = Sequelize.DataTypes;
const faker = require('faker')

const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/acme_movie_generator')

const Movie = conn.define('movie', {
    movieTitle: {
        type: STRING,
        allowNull: false
    },
    star: {
     type: INTEGER,
     defaultValue: 3,
     validate: {
         min: 1,
         max: 5
     }
    }
})

const syncAndSeed = async() => {
    await conn.sync({ force: true })
    const movies = new Array(5).fill('').map( _ => {
        return {
            movieTitle: faker.name.title()
        }
    })
    await Promise.all(movies.map( movie => Movie.create(movie)))
}

app.use(express.json())

app.use("/dist", express.static(path.join(__dirname, "dist")));

app.get("/", (req, res) => res.sendFile(path.join(__dirname, "index.html")));

app.get('/api/movies', async(req, res, next)=> {
    try{
        res.send(await Movie.findAll())
    }
    catch(ex){
        next(ex)
    }
})

app.post('/api/movies', async(req, res, next)=> {
    try {
        res.status(201).send(await Movie.create(req.body))
    }
    catch(ex){
        next(ex)
    }
})

app.put('/api/:id', async(req, res, next) => {
    try {
      const movie = await Movie.findByPk(req.params.id)
      await movie.save()
      res.send(await movie.update(req.body));
    }
    catch(ex){
      next(ex);
    }
  });

app.delete('/api/:id', async(req, res, next) => {
    try {
      const movie = await Movie.findByPk(req.params.id);
      await movie.destroy();
      res.send(movie);
    }
    catch(ex){
      next(ex);
    }
  })

const init = async () => {
  try {
    await syncAndSeed();
    const port = process.env.PORT || 3000;
    app.listen(port, () => console.log(`listening on port ${port}`));
  } catch (ex) {
    console.log(ex);
  }
};


init();