export const movies = [
  {
    id: 1,
    type: 'movie',
    title: 'Extraction',
    description: "A hardened mercenary's mission becomes a soul-searching race to survive when he's sent into Bangladesh to rescue a drug lord's kidnapped son.",
    poster: 'https://images.pexels.com/photos/7991162/pexels-photo-7991162.jpeg?auto=compress&cs=tinysrgb&w=800',
    backdrop: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=1600',
    rating: 8.7,
    releaseDate: '2023-06-15',
    genres: ['Action', 'Thriller'],
    trailer: 'https://www.youtube.com/embed/V95zEZ0O-QU',
    cast: [
      {
        id: 1,
        name: 'Chris Hemsworth',
        character: 'Tyler Rake',
        photo: 'https://images.pexels.com/photos/1121796/pexels-photo-1121796.jpeg?auto=compress&cs=tinysrgb&w=150'
      },
      {
        id: 2,
        name: 'Rudhraksh Jaiswal',
        character: 'Ovi Mahajan',
        photo: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=150'
      }
    ],
    director: 'Sam Hargrave',
    duration: 116,
    views: 15000000,
    trending: true
  },
  // ... (rest of the movie objects as plain JS)
]

export const series = [
  {
    id: 101,
    type: 'series',
    title: 'The Crown',
    description: "Follows the political rivalries and romance of Queen Elizabeth II's reign and the events that shaped the second half of the twentieth century.",
    poster: 'https://images.pexels.com/photos/5825576/pexels-photo-5825576.jpeg?auto=compress&cs=tinysrgb&w=800',
    backdrop: 'https://images.pexels.com/photos/7991155/pexels-photo-7991155.jpeg?auto=compress&cs=tinysrgb&w=1600',
    rating: 8.7,
    releaseDate: '2023-11-04',
    genres: ['Drama', 'History'],
    trailer: 'https://www.youtube.com/embed/JWtnJjn6ng0',
    cast: [
      {
        id: 15,
        name: 'Olivia Colman',
        character: 'Queen Elizabeth II',
        photo: 'https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=150'
      },
      {
        id: 16,
        name: 'Tobias Menzies',
        character: 'Prince Philip',
        photo: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=150'
      }
    ],
    director: 'Peter Morgan',
    seasons: [
      {
        id: 1,
        title: 'Season 1',
        episodes: [
          {
            id: 1,
            title: 'Wolferton Splash',
            description: "A young Princess Elizabeth marries Prince Philip. As King George VI's health worsens, Winston Churchill is elected prime minister for the second time.",
            duration: 57,
            thumbnail: 'https://images.pexels.com/photos/5824523/pexels-photo-5824523.jpeg?auto=compress&cs=tinysrgb&w=500',
            season: 1,
            episode: 1
          },
          {
            id: 2,
            title: 'Hyde Park Corner',
            description: "With King George too ill to travel, Elizabeth and Philip embark on a four-continent Commonwealth tour. Party leaders attempt to undermine Churchill.",
            duration: 61,
            thumbnail: 'https://images.pexels.com/photos/5824518/pexels-photo-5824518.jpeg?auto=compress&cs=tinysrgb&w=500',
            season: 1,
            episode: 2
          }
        ]
      },
      // ... (additional seasons and episodes as plain JS)
    ],
    totalEpisodes: 4,
    status: 'ongoing',
    views: 22000000,
    trending: true
  },
  // ... (rest of the series objects as plain JS)
] // end of series
