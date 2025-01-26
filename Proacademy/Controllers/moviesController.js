const fs = require('fs');

const movies = JSON.parse(fs.readFileSync('./data/movies.json'));

// PARAM MIDDLEWARE FUNCTION
exports.checkId = (req, res, next, value) => {
    const movie = movies.find((ele => ele.id === value * 1));
    if(!movie){
        return res.status(404).json({
            status: 'fail',
            message: `Movie with ID ${value} not found.        `
        })
    }
    next();
}

// MIDDLEWARE TO CHECK REQUEST BODY
exports.validateBody = (req, res, next) => {
    if(!req.body.name || !req.body.releaseYear || !req.body.duration){
        return res.status(400).json({
            status: 'fail',
            message: 'Bad request body'
        })
    }
    next();
}

// ROUTE HANDLER FUNCTIONS  
exports.getAllMovies = (req, res) => {
    res.json({
        status: "success",
        requestedAt: req.requestedAt,
        count: movies.length,
        data: {
            movies: movies
        }
    })
}

exports.getMovieById = (req, res) => {
    console.log(req.params);

    const id = Number(req.params.id);
    const movie = movies.find((ele => ele.id === id));

    // if(movie){
        return res.status(200).json({
            status: 'success',
            data: {
                movie: movie
            }
        })
    // }
    
    // res.status(404).json({
    //     status: 'fail',
    //     message: `Movie with ID ${id} is not found.`
    // })
}

exports.updateMovie = (req, res) => {
    const id = req.params.id * 1;
    const movieToUpdate = movies.find((ele => ele.id === id));
    console.log(id, movieToUpdate);
    
    // if(!movieToUpdate){
    //     return res.status(404).json({
    //         status: 'fail',
    //         message: `Movie with ID ${id} not found.        `
    //     })

    // }
    const index = movies.indexOf(movieToUpdate);
    Object.assign(movieToUpdate, req.body)
    movies[index] = movieToUpdate;

    console.log(movies);
    fs.writeFile('./data/movies.json', JSON.stringify(movies), (err) => {
        if(err){
            console.log(err);
            
        }else{
            res.status(200).json({
                status: 'success',
                data: {
                    movie: movieToUpdate
                }
            })
        }
    })
    
    
}

exports.addMovie = (req, res) => {
    console.log(req.body);
    const newId = movies[movies.length - 1].id  + 1;
    const newMovie = Object.assign({id: newId}, req.body);

    movies.push(newMovie);

    fs.writeFile('./data/movies.json', JSON.stringify(movies), (err) => {
        if(err){
            console.log('Something went wrong!');
            
        }else{
            res.status(201).json({
                status: 'success',
                data: {
                    movies: newMovie
                }
            })
        }
    })
    // res.send(req.body)
}

exports.deleteMovie = (req, res) => {
    const id = req.params.id * 1;
    const movieToDelete = movies.find((ele => ele.id === id));

    // if(!movieToDelete){
    //     return res.status(404).json({
    //         status: 'fail',
    //         message: `No movie found with ID ${id}.`
    //     })
    // }

    const index = movies.indexOf(movieToDelete);
    movies.splice(index, 1);

    fs.writeFile('./data/movies.json', JSON.stringify(movies), (err) => {
        if(err){
            console.log(err);
            
        }else{
            res.status(204).json({
                status: 'success',
                data: {
                    movie: null
                }
            })
        }
    })

}