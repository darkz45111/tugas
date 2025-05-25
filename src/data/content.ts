import type { Movie, Series } from '../types/content'

export const movies: Movie[] = [
  {
    id: 1,
    type: 'movie',
    title: 'Extraction',
    description: 'A hardened mercenary\'s mission becomes a soul-searching race to survive when he\'s sent into Bangladesh to rescue a drug lord\'s kidnapped son.',
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
  {
    id: 2,
    type: 'movie',
    title: 'The Shawshank Redemption',
    description: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
    poster: 'https://images.pexels.com/photos/1525589/pexels-photo-1525589.jpeg?auto=compress&cs=tinysrgb&w=800',
    backdrop: 'https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg?auto=compress&cs=tinysrgb&w=1600',
    rating: 9.3,
    releaseDate: '2022-09-23',
    genres: ['Drama'],
    trailer: 'https://www.youtube.com/embed/6hB3S9bIaco',
    cast: [
      {
        id: 3,
        name: 'Tim Robbins',
        character: 'Andy Dufresne',
        photo: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150'
      },
      {
        id: 4,
        name: 'Morgan Freeman',
        character: 'Ellis Boyd "Red" Redding',
        photo: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150'
      }
    ],
    director: 'Frank Darabont',
    duration: 142,
    views: 12000000,
    trending: false
  },
  {
    id: 3,
    type: 'movie',
    title: 'Interstellar',
    description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.',
    poster: 'https://images.pexels.com/photos/1906658/pexels-photo-1906658.jpeg?auto=compress&cs=tinysrgb&w=800',
    backdrop: 'https://images.pexels.com/photos/1341279/pexels-photo-1341279.jpeg?auto=compress&cs=tinysrgb&w=1600',
    rating: 8.6,
    releaseDate: '2023-11-07',
    genres: ['Sci-Fi', 'Drama', 'Adventure'],
    trailer: 'https://www.youtube.com/embed/zSWdZVtXT7E',
    cast: [
      {
        id: 5,
        name: 'Matthew McConaughey',
        character: 'Joseph Cooper',
        photo: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=150'
      },
      {
        id: 6,
        name: 'Anne Hathaway',
        character: 'Dr. Amelia Brand',
        photo: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=150'
      }
    ],
    director: 'Christopher Nolan',
    duration: 169,
    views: 18000000,
    trending: true
  },
  {
    id: 4,
    type: 'movie',
    title: 'To All the Boys I\'ve Loved Before',
    description: 'A teenage girl\'s secret love letters are exposed and wreak havoc on her love life.',
    poster: 'https://images.pexels.com/photos/2263669/pexels-photo-2263669.jpeg?auto=compress&cs=tinysrgb&w=800',
    backdrop: 'https://images.pexels.com/photos/1024967/pexels-photo-1024967.jpeg?auto=compress&cs=tinysrgb&w=1600',
    rating: 7.1,
    releaseDate: '2023-08-17',
    genres: ['Romance', 'Comedy'],
    trailer: 'https://www.youtube.com/embed/555oiY9RWM4',
    cast: [
      {
        id: 7,
        name: 'Lana Condor',
        character: 'Lara Jean Covey',
        photo: 'https://images.pexels.com/photos/1542085/pexels-photo-1542085.jpeg?auto=compress&cs=tinysrgb&w=150'
      },
      {
        id: 8,
        name: 'Noah Centineo',
        character: 'Peter Kavinsky',
        photo: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150'
      }
    ],
    director: 'Susan Johnson',
    duration: 99,
    views: 9000000,
    trending: false
  },
  {
    id: 5,
    type: 'movie',
    title: 'The Conjuring',
    description: 'Paranormal investigators Ed and Lorraine Warren work to help a family terrorized by a dark presence in their farmhouse.',
    poster: 'https://images.pexels.com/photos/8279790/pexels-photo-8279790.jpeg?auto=compress&cs=tinysrgb&w=800',
    backdrop: 'https://images.pexels.com/photos/2961407/pexels-photo-2961407.jpeg?auto=compress&cs=tinysrgb&w=1600',
    rating: 7.5,
    releaseDate: '2023-07-19',
    genres: ['Horror', 'Thriller'],
    trailer: 'https://www.youtube.com/embed/k10ETZ41q5o',
    cast: [
      {
        id: 9,
        name: 'Vera Farmiga',
        character: 'Lorraine Warren',
        photo: 'https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=150'
      },
      {
        id: 10,
        name: 'Patrick Wilson',
        character: 'Ed Warren',
        photo: 'https://images.pexels.com/photos/1300402/pexels-photo-1300402.jpeg?auto=compress&cs=tinysrgb&w=150'
      }
    ],
    director: 'James Wan',
    duration: 112,
    views: 11000000,
    trending: true
  },
  {
    id: 6,
    type: 'movie',
    title: 'John Wick',
    description: 'An ex-hitman comes out of retirement to track down the gangsters who killed his dog and stole his car.',
    poster: 'https://images.pexels.com/photos/11758754/pexels-photo-11758754.jpeg?auto=compress&cs=tinysrgb&w=800',
    backdrop: 'https://images.pexels.com/photos/3876328/pexels-photo-3876328.jpeg?auto=compress&cs=tinysrgb&w=1600',
    rating: 7.4,
    releaseDate: '2024-01-10',
    genres: ['Action', 'Thriller'],
    trailer: 'https://www.youtube.com/embed/C0BMx-qxsP4',
    cast: [
      {
        id: 11,
        name: 'Keanu Reeves',
        character: 'John Wick',
        photo: 'https://images.pexels.com/photos/2095582/pexels-photo-2095582.jpeg?auto=compress&cs=tinysrgb&w=150'
      },
      {
        id: 12,
        name: 'Michael Nyqvist',
        character: 'Viggo Tarasov',
        photo: 'https://images.pexels.com/photos/1080243/pexels-photo-1080243.jpeg?auto=compress&cs=tinysrgb&w=150'
      }
    ],
    director: 'Chad Stahelski',
    duration: 101,
    views: 16000000,
    trending: true
  },
  {
    id: 7,
    type: 'movie',
    title: 'Mad Max: Fury Road',
    description: 'In a post-apocalyptic wasteland, a woman rebels against a tyrannical ruler in search for her homeland with the aid of a group of female prisoners, a psychotic worshiper, and a drifter named Max.',
    poster: 'https://images.pexels.com/photos/3262249/pexels-photo-3262249.jpeg?auto=compress&cs=tinysrgb&w=800',
    backdrop: 'https://images.pexels.com/photos/1619317/pexels-photo-1619317.jpeg?auto=compress&cs=tinysrgb&w=1600',
    rating: 8.1,
    releaseDate: '2023-05-15',
    genres: ['Action', 'Sci-Fi'],
    trailer: 'https://www.youtube.com/embed/hEJnMQG9ev8',
    cast: [
      {
        id: 13,
        name: 'Tom Hardy',
        character: 'Max Rockatansky',
        photo: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150'
      },
      {
        id: 14,
        name: 'Charlize Theron',
        character: 'Imperator Furiosa',
        photo: 'https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=150'
      }
    ],
    director: 'George Miller',
    duration: 120,
    views: 14000000,
    trending: false
  }
]

export const series: Series[] = [
  {
    id: 101,
    type: 'series',
    title: 'The Crown',
    description: 'Follows the political rivalries and romance of Queen Elizabeth II\'s reign and the events that shaped the second half of the twentieth century.',
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
            description: 'A young Princess Elizabeth marries Prince Philip. As King George VI\'s health worsens, Winston Churchill is elected prime minister for the second time.',
            duration: 57,
            thumbnail: 'https://images.pexels.com/photos/5824523/pexels-photo-5824523.jpeg?auto=compress&cs=tinysrgb&w=500',
            season: 1,
            episode: 1
          },
          {
            id: 2,
            title: 'Hyde Park Corner',
            description: 'With King George too ill to travel, Elizabeth and Philip embark on a four-continent Commonwealth tour. Party leaders attempt to undermine Churchill.',
            duration: 61,
            thumbnail: 'https://images.pexels.com/photos/5824518/pexels-photo-5824518.jpeg?auto=compress&cs=tinysrgb&w=500',
            season: 1,
            episode: 2
          }
        ]
      },
      {
        id: 2,
        title: 'Season 2',
        episodes: [
          {
            id: 3,
            title: 'Misadventure',
            description: 'As Philip leaves for a long tour, Elizabeth makes an upsetting discovery. Prime Minister Eden wants to strike back after Egypt seizes the Suez Canal.',
            duration: 56,
            thumbnail: 'https://images.pexels.com/photos/5824897/pexels-photo-5824897.jpeg?auto=compress&cs=tinysrgb&w=500',
            season: 2,
            episode: 1
          },
          {
            id: 4,
            title: 'A Company of Men',
            description: 'Elizabeth feels disconnected from Philip. Eden copes with international pressure and ill health. An interview stirs up harrowing memories for Philip.',
            duration: 54,
            thumbnail: 'https://images.pexels.com/photos/5825454/pexels-photo-5825454.jpeg?auto=compress&cs=tinysrgb&w=500',
            season: 2,
            episode: 2
          }
        ]
      }
    ],
    totalEpisodes: 4,
    status: 'ongoing',
    views: 22000000,
    trending: true
  },
  {
    id: 102,
    type: 'series',
    title: 'Brooklyn Nine-Nine',
    description: 'Jake Peralta, an immature but talented NYPD detective in Brooklyn\'s 99th Precinct, comes into conflict with his new commanding officer, the serious and stern Captain Raymond Holt.',
    poster: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=800',
    backdrop: 'https://images.pexels.com/photos/2346185/pexels-photo-2346185.jpeg?auto=compress&cs=tinysrgb&w=1600',
    rating: 8.4,
    releaseDate: '2023-09-17',
    genres: ['Comedy', 'Crime'],
    trailer: 'https://www.youtube.com/embed/sEOuJ4z5aTc',
    cast: [
      {
        id: 17,
        name: 'Andy Samberg',
        character: 'Jake Peralta',
        photo: 'https://images.pexels.com/photos/1484794/pexels-photo-1484794.jpeg?auto=compress&cs=tinysrgb&w=150'
      },
      {
        id: 18,
        name: 'Andre Braugher',
        character: 'Raymond Holt',
        photo: 'https://images.pexels.com/photos/2531553/pexels-photo-2531553.jpeg?auto=compress&cs=tinysrgb&w=150'
      }
    ],
    director: 'Dan Goor',
    seasons: [
      {
        id: 3,
        title: 'Season 1',
        episodes: [
          {
            id: 5,
            title: 'Pilot',
            description: 'Detective Jake Peralta is a talented, but carefree police detective at Brooklyn\'s 99th precinct who, along with his colleagues, are used to having a lax captain around the office.',
            duration: 23,
            thumbnail: 'https://images.pexels.com/photos/7504837/pexels-photo-7504837.jpeg?auto=compress&cs=tinysrgb&w=500',
            season: 1,
            episode: 1
          },
          {
            id: 6,
            title: 'The Tagger',
            description: 'Jake is assigned a case to find a graffiti artist by Captain Holt, who\'s taking a special interest in his work.',
            duration: 22,
            thumbnail: 'https://images.pexels.com/photos/4577/city-graffiti-building-art.jpg?auto=compress&cs=tinysrgb&w=500',
            season: 1,
            episode: 2
          }
        ]
      }
    ],
    totalEpisodes: 2,
    status: 'ended',
    views: 19000000,
    trending: false
  },
  {
    id: 103,
    type: 'series',
    title: 'Stranger Things',
    description: 'When a young boy disappears, his mother, a police chief and his friends must confront terrifying supernatural forces in order to get him back.',
    poster: 'https://images.pexels.com/photos/7504797/pexels-photo-7504797.jpeg?auto=compress&cs=tinysrgb&w=800',
    backdrop: 'https://images.pexels.com/photos/8499899/pexels-photo-8499899.jpeg?auto=compress&cs=tinysrgb&w=1600',
    rating: 8.7,
    releaseDate: '2024-02-15',
    genres: ['Drama', 'Fantasy', 'Horror', 'Sci-Fi'],
    trailer: 'https://www.youtube.com/embed/b9EkMc79ZSU',
    cast: [
      {
        id: 19,
        name: 'Millie Bobby Brown',
        character: 'Eleven',
        photo: 'https://images.pexels.com/photos/1742371/pexels-photo-1742371.jpeg?auto=compress&cs=tinysrgb&w=150'
      },
      {
        id: 20,
        name: 'Finn Wolfhard',
        character: 'Mike Wheeler',
        photo: 'https://images.pexels.com/photos/2531551/pexels-photo-2531551.jpeg?auto=compress&cs=tinysrgb&w=150'
      }
    ],
    director: 'The Duffer Brothers',
    seasons: [
      {
        id: 4,
        title: 'Season 1',
        episodes: [
          {
            id: 7,
            title: 'Chapter One: The Vanishing of Will Byers',
            description: 'On his way home from a friend\'s house, young Will sees something terrifying. Nearby, a sinister secret lurks in the depths of a government lab.',
            duration: 50,
            thumbnail: 'https://images.pexels.com/photos/5767583/pexels-photo-5767583.jpeg?auto=compress&cs=tinysrgb&w=500',
            season: 1,
            episode: 1
          },
          {
            id: 8,
            title: 'Chapter Two: The Weirdo on Maple Street',
            description: 'Lucas, Mike and Dustin try to talk to the girl they found in the woods. Hopper questions an anxious Joyce about an unsettling phone call.',
            duration: 55,
            thumbnail: 'https://images.pexels.com/photos/5767582/pexels-photo-5767582.jpeg?auto=compress&cs=tinysrgb&w=500',
            season: 1,
            episode: 2
          }
        ]
      }
    ],
    totalEpisodes: 2,
    status: 'ongoing',
    views: 25000000,
    trending: true
  },
  {
    id: 104,
    type: 'series',
    title: 'The Office',
    description: 'A mockumentary on a group of typical office workers, where the workday consists of ego clashes, inappropriate behavior, and tedium.',
    poster: 'https://images.pexels.com/photos/1170412/pexels-photo-1170412.jpeg?auto=compress&cs=tinysrgb&w=800',
    backdrop: 'https://images.pexels.com/photos/7578980/pexels-photo-7578980.jpeg?auto=compress&cs=tinysrgb&w=1600',
    rating: 8.9,
    releaseDate: '2023-03-24',
    genres: ['Comedy'],
    trailer: 'https://www.youtube.com/embed/LHOtME2DL4g',
    cast: [
      {
        id: 21,
        name: 'Steve Carell',
        character: 'Michael Scott',
        photo: 'https://images.pexels.com/photos/1300402/pexels-photo-1300402.jpeg?auto=compress&cs=tinysrgb&w=150'
      },
      {
        id: 22,
        name: 'John Krasinski',
        character: 'Jim Halpert',
        photo: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=150'
      }
    ],
    director: 'Greg Daniels',
    seasons: [
      {
        id: 5,
        title: 'Season 1',
        episodes: [
          {
            id: 9,
            title: 'Pilot',
            description: 'The premiere episode introduces the boss and staff of Dunder Mifflin, Inc., a paper company in Scranton, Pennsylvania.',
            duration: 23,
            thumbnail: 'https://images.pexels.com/photos/1438081/pexels-photo-1438081.jpeg?auto=compress&cs=tinysrgb&w=500',
            season: 1,
            episode: 1
          },
          {
            id: 10,
            title: 'Diversity Day',
            description: 'Michael\'s offensive behavior prompts the corporate office to bring in a sensitivity trainer.',
            duration: 22,
            thumbnail: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=500',
            season: 1,
            episode: 2
          }
        ]
      }
    ],
    totalEpisodes: 2,
    status: 'ended',
    views: 20000000,
    trending: false
  },
  {
    id: 105,
    type: 'series',
    title: 'Bridgerton',
    description: 'Wealth, lust, and betrayal set against the backdrop of Regency-era England, seen through the eyes of the powerful Bridgerton family.',
    poster: 'https://images.pexels.com/photos/3671186/pexels-photo-3671186.jpeg?auto=compress&cs=tinysrgb&w=800',
    backdrop: 'https://images.pexels.com/photos/208701/pexels-photo-208701.jpeg?auto=compress&cs=tinysrgb&w=1600',
    rating: 7.5,
    releaseDate: '2023-12-25',
    genres: ['Drama', 'Romance'],
    trailer: 'https://www.youtube.com/embed/sIsKen3y-mU',
    cast: [
      {
        id: 23,
        name: 'Regé-Jean Page',
        character: 'Simon Basset, Duke of Hastings',
        photo: 'https://images.pexels.com/photos/2232981/pexels-photo-2232981.jpeg?auto=compress&cs=tinysrgb&w=150'
      },
      {
        id: 24,
        name: 'Phoebe Dynevor',
        character: 'Daphne Bridgerton',
        photo: 'https://images.pexels.com/photos/1036622/pexels-photo-1036622.jpeg?auto=compress&cs=tinysrgb&w=150'
      }
    ],
    director: 'Chris Van Dusen',
    seasons: [
      {
        id: 6,
        title: 'Season 1',
        episodes: [
          {
            id: 11,
            title: 'Diamond of the First Water',
            description: 'Daphne debuts on London\'s marriage market as Queen Charlotte names her the season\'s incomparable. Simon, the Duke of Hastings, returns to town.',
            duration: 60,
            thumbnail: 'https://images.pexels.com/photos/3754600/pexels-photo-3754600.jpeg?auto=compress&cs=tinysrgb&w=500',
            season: 1,
            episode: 1
          },
          {
            id: 12,
            title: 'Shock and Delight',
            description: 'Simon\'s interest in Daphne increases when he discovers she has other suitors. Lady Featherington helps Prudence find a husband.',
            duration: 60,
            thumbnail: 'https://images.pexels.com/photos/3754689/pexels-photo-3754689.jpeg?auto=compress&cs=tinysrgb&w=500',
            season: 1,
            episode: 2
          }
        ]
      }
    ],
    totalEpisodes: 2,
    status: 'ongoing',
    views: 17000000,
    trending: true
  },
  {
    id: 106,
    type: 'series',
    title: 'Haunting of Hill House',
    description: 'Flashing between past and present, a fractured family confronts haunting memories of their old home and the terrifying events that drove them from it.',
    poster: 'https://images.pexels.com/photos/3807517/pexels-photo-3807517.jpeg?auto=compress&cs=tinysrgb&w=800',
    backdrop: 'https://images.pexels.com/photos/7175435/pexels-photo-7175435.jpeg?auto=compress&cs=tinysrgb&w=1600',
    rating: 8.6,
    releaseDate: '2023-10-12',
    genres: ['Drama', 'Horror', 'Mystery'],
    trailer: 'https://www.youtube.com/embed/G9OzG53VwIk',
    cast: [
      {
        id: 25,
        name: 'Victoria Pedretti',
        character: 'Nell Crain',
        photo: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=150'
      },
      {
        id: 26,
        name: 'Oliver Jackson-Cohen',
        character: 'Luke Crain',
        photo: 'https://images.pexels.com/photos/2531553/pexels-photo-2531553.jpeg?auto=compress&cs=tinysrgb&w=150'
      }
    ],
    director: 'Mike Flanagan',
    seasons: [
      {
        id: 7,
        title: 'Season 1',
        episodes: [
          {
            id: 13,
            title: 'Steven Sees a Ghost',
            description: 'While investigating a ghost story for his latest novel, a skeptical Steven receives a call from his sister that triggers a chain of fateful events.',
            duration: 60,
            thumbnail: 'https://images.pexels.com/photos/7175450/pexels-photo-7175450.jpeg?auto=compress&cs=tinysrgb&w=500',
            season: 1,
            episode: 1
          },
          {
            id: 14,
            title: 'Open Casket',
            description: 'A devastating family tragedy stirs memories of traumatic losses, reminding Shirley of her first brush with death -- and awakening long-dormant fears.',
            duration: 51,
            thumbnail: 'https://images.pexels.com/photos/7175455/pexels-photo-7175455.jpeg?auto=compress&cs=tinysrgb&w=500',
            season: 1,
            episode: 2
          }
        ]
      }
    ],
    totalEpisodes: 2,
    status: 'ended',
    views: 13000000,
    trending: false
  }
]