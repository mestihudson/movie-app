const nock = require('nock')

const mockTmdbCall = async () => {
  const id = 6346649
  nock('https://api.themoviedb.org')
    .get('/4/list/1')
    .reply(200, {
      "page": 1,
      "total_pages": 3,
      "total_results": 3,
      "results": [{
        id,
        "media_type": "movie",
        "backdrop_path": "/1b.jpg",
        "poster_path": "/1p.jpg",
        "title": "1t",
        "overview": "1d",
      }]
    })
    .get('/4/list/1')
    .reply(200, {
      "page": 2,
      "total_pages": 3,
      "total_results": 3,
      "results": [{
        id,
        "media_type": "movie",
        "backdrop_path": "/2b.jpg",
        "poster_path": "/2p.jpg",
        "title": "2t",
        "overview": "2d",
      }]
    })
    .get('/4/list/1')
    .reply(200, {
      "page": 3,
      "total_pages": 3,
      "total_results": 3,
      "results": [{
        id,
        "media_type": "movie",
        "backdrop_path": "/3b.jpg",
        "poster_path": "/3p.jpg",
        "title": "3t",
        "overview": "3d",
      }]
    })
    .get(`/3/movie/${id}/credits`)
    .times(3)
    .reply(200, {
      id,
      crew: [{
          "name": "Anthony Russo",
          "job": "Director",
        },{
          "name": "Joe Russo",
          "job": "Director",
        },{
          "name": "Kevin Feige",
          "job": "Producer"
      }],
    })
  ;
}

module.exports = { mockTmdbCall }
