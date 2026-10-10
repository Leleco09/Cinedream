/**
 * Catálogo de Demonstração (Mock Data)
 * 
 * NOTA: Estes itens são estritamente fictícios para testes e demonstração inicial
 * da interface visual e da reprodução de vídeo compatível com o Rave.
 * Todos os vídeos utilizam links públicos com suporte comprovado a streaming e Range Requests (HTTP 206).
 */

const DEMO_CATALOG = [
  {
    id: "filme-tears-of-steel",
    type: "movie",
    title: "Tears of Steel",
    originalTitle: "Tears of Steel (Sci-Fi Project)",
    year: 2023,
    rating: 8.7,
    duration: "12 min",
    genres: ["Ficção Científica", "Ação", "Cyberpunk"],
    badge: "DEMO",
    poster: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80",
    backdrop: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1600&q=80",
    synopsis: "Em um futuro distópico onde a humanidade luta contra forças robóticas de grande porte, um grupo de operadores de elite tenta reverter o colapso através de uma antiga memória.",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4"
  },
  {
    id: "filme-big-buck-bunny",
    type: "movie",
    title: "Big Buck Bunny",
    originalTitle: "Big Buck Bunny (Animation)",
    year: 2022,
    rating: 8.4,
    duration: "10 min",
    genres: ["Animação", "Comédia", "Família"],
    badge: "DEMO",
    poster: "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=600&q=80",
    backdrop: "https://images.unsplash.com/photo-1511447333015-45b65e60f6d5?auto=format&fit=crop&w=1600&q=80",
    synopsis: "Um coelho bem-humorado decide criar armadilhas engenhosas para restaurar a paz na floresta após ser provocado por roedores travessos.",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
  },
  {
    id: "filme-sintel",
    type: "movie",
    title: "Sintel: Em Busca do Dragão",
    originalTitle: "Sintel",
    year: 2021,
    rating: 8.9,
    duration: "15 min",
    genres: ["Fantasia", "Aventura", "Drama"],
    badge: "DEMO",
    poster: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80",
    backdrop: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1600&q=80",
    synopsis: "Uma guerreira solitária viaja por montanhas perigosas e tempestades de gelo à procura de um pequeno filhote de dragão que ela resgatou no passado.",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4"
  },
  {
    id: "serie-cronicas-cosmicas",
    type: "series",
    title: "Crônicas Cósmicas",
    originalTitle: "Cosmic Chronicles",
    year: 2024,
    rating: 9.2,
    duration: "1 Temporada",
    genres: ["Ficção Científica", "Aventura", "Espaço"],
    badge: "DEMO",
    poster: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80",
    backdrop: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=1600&q=80",
    synopsis: "Uma expedição tripulada navega pelos confins inexplorados da Via Láctea enfrentando tempestades eletromagnéticas e anomalias de dobra espacial.",
    seasons: [
      {
        seasonNumber: 1,
        title: "Temporada 1: O Limiar do Universo",
        episodes: [
          {
            episodeNumber: 1,
            title: "Além da Atmosfera",
            duration: "15 seg (Amostra)",
            synopsis: "A nave Prometheus decola em direção ao primeiro ponto de salto hiperespacial.",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
          },
          {
            episodeNumber: 2,
            title: "Tempestade Solar",
            duration: "15 seg (Amostra)",
            synopsis: "Uma rajada de radiação põe os sistemas de navegação à prova enquanto a equipe busca abrigo.",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"
          },
          {
            episodeNumber: 3,
            title: "O Ponto Sem Retorno",
            duration: "15 seg (Amostra)",
            synopsis: "A tripulação alcança a fronteira final e capta um sinal de transmissão desconhecido.",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4"
          }
        ]
      }
    ]
  },
  {
    id: "serie-cidade-oculta",
    type: "series",
    title: "Cidade Oculta",
    originalTitle: "The Hidden City",
    year: 2023,
    rating: 8.5,
    duration: "1 Temporada",
    genres: ["Suspense", "Policial", "Mistério"],
    badge: "DEMO",
    poster: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=600&q=80",
    backdrop: "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?auto=format&fit=crop&w=1600&q=80",
    synopsis: "Em uma metrópole envolta em névoa e segredos, detetives investigam uma série de ocorrências inexplicáveis em arquivos governamentais abandonados.",
    seasons: [
      {
        seasonNumber: 1,
        title: "Temporada 1: Sombras no Asfalto",
        episodes: [
          {
            episodeNumber: 1,
            title: "O Encontro da Meia-Noite",
            duration: "15 seg (Amostra)",
            synopsis: "Um bilhete anônimo conduz o detetive até o antigo terminal ferroviário.",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4"
          },
          {
            episodeNumber: 2,
            title: "Códigos e Frequências",
            duration: "15 seg (Amostra)",
            synopsis: "A decodificação de um rádio antigo revela pistas cruciais sobre a conspiração.",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4"
          }
        ]
      }
    ]
  },
  {
    id: "filme-elephants-dream",
    type: "movie",
    title: "Elephants Dream",
    originalTitle: "Elephants Dream (Sci-Fi Machine)",
    year: 2020,
    rating: 7.9,
    duration: "11 min",
    genres: ["Ficção Científica", "Animação", "Surreal"],
    badge: "DEMO",
    poster: "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?auto=format&fit=crop&w=600&q=80",
    backdrop: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1600&q=80",
    synopsis: "Dois exploradores caminham pelo interior de uma máquina mecânica gigantesca e viva que reage aos seus próprios pensamentos e medos.",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
  }
];
