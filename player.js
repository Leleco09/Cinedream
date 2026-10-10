/**
 * CinePrivado - Lógica da Página do Player Dedicado (Compatível com Rave)
 */

(function () {
  'use strict';

  // Elementos do DOM
  const videoPlayer = document.getElementById('videoPlayer');
  const videoSource = document.getElementById('videoSource');
  const playerTypeBadge = document.getElementById('playerTypeBadge');
  const playerTitle = document.getElementById('playerTitle');
  const playerSubtitle = document.getElementById('playerSubtitle');
  const playerSynopsis = document.getElementById('playerSynopsis');
  const currentUrlDisplay = document.getElementById('currentUrlDisplay');
  const copyUrlBtn = document.getElementById('copyUrlBtn');
  const copyRaveBtnTop = document.getElementById('copyRaveBtnTop');
  const seriesSidebar = document.getElementById('seriesSidebar');
  const playlistContainer = document.getElementById('playlistContainer');
  const episodeCountBadge = document.getElementById('episodeCountBadge');
  const toast = document.getElementById('toast');

  // 1. Obter Parâmetros da URL
  function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    return {
      id: params.get('id') || '',
      season: parseInt(params.get('season') || '1', 10),
      ep: parseInt(params.get('ep') || '1', 10)
    };
  }

  // 2. Inicialização do Player
  function initPlayer() {
    const { id, season, ep } = getQueryParams();

    // Se nenhum ID for passado, usar o primeiro filme de demonstração
    const item = DEMO_CATALOG.find(i => i.id === id) || DEMO_CATALOG[0];

    if (!item) {
      playerTitle.textContent = 'Nenhum vídeo selecionado';
      playerSynopsis.textContent = 'Volte ao catálogo para escolher um filme ou episódio.';
      return;
    }

    // Atualiza a URL exibida na caixa do Rave
    currentUrlDisplay.textContent = window.location.href;

    if (item.type === 'movie') {
      setupMovie(item);
    } else {
      setupSeries(item, season, ep);
    }

    setupCopyButtons();
    setupVideoDiagnostics();
  }

  // 3. Configurar Filme
  function setupMovie(movie) {
    playerTypeBadge.textContent = 'FILME';
    playerTitle.textContent = movie.title;
    playerSubtitle.style.display = 'none';
    playerSynopsis.textContent = movie.synopsis;
    seriesSidebar.style.display = 'none';

    loadVideoStream(movie.videoUrl);
  }

  // 4. Configurar Série
  function setupSeries(series, targetSeason, targetEp) {
    playerTypeBadge.textContent = 'SÉRIE';
    playerTitle.textContent = series.title;

    // Encontrar temporada e episódio
    const seasonData = (series.seasons || []).find(s => s.seasonNumber === targetSeason) || series.seasons[0];
    const episodeData = (seasonData && seasonData.episodes) 
      ? (seasonData.episodes.find(e => e.episodeNumber === targetEp) || seasonData.episodes[0])
      : null;

    if (episodeData) {
      playerSubtitle.style.display = 'block';
      playerSubtitle.textContent = `Temporada ${seasonData.seasonNumber} • Episódio ${episodeData.episodeNumber}: ${episodeData.title}`;
      playerSynopsis.textContent = episodeData.synopsis || series.synopsis;

      loadVideoStream(episodeData.videoUrl);
    } else {
      playerSynopsis.textContent = series.synopsis;
    }

    // Renderizar playlist lateral
    seriesSidebar.style.display = 'flex';
    renderPlaylist(series, targetSeason, targetEp);
  }

  // 5. Inserir Stream no Player HTML5
  function loadVideoStream(url) {
    if (!url) {
      console.warn('URL de vídeo não fornecida.');
      return;
    }

    // Atribuição direta para máxima compatibilidade com navegadores e Rave
    videoSource.src = url;
    videoPlayer.load();

    // Tentar reprodução com tratamento de política de autoplay móvel
    const playPromise = videoPlayer.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Autoplay bloqueado pelo navegador até o usuário interagir: normal em celulares
        console.log('Autoplay suspenso pelo navegador até interação do usuário.');
      });
    }
  }

  // 6. Renderizar Barra Lateral de Episódios
  function renderPlaylist(series, activeSeason, activeEp) {
    playlistContainer.innerHTML = '';
    let totalEpisodes = 0;

    (series.seasons || []).forEach(season => {
      (season.episodes || []).forEach(ep => {
        totalEpisodes++;
        const isCurrent = (season.seasonNumber === activeSeason && ep.episodeNumber === activeEp);

        const card = document.createElement('a');
        card.href = `player.html?id=${series.id}&season=${season.seasonNumber}&ep=${ep.episodeNumber}`;
        card.className = `playlist-ep-card ${isCurrent ? 'active' : ''}`;

        card.innerHTML = `
          <div class="ep-card-left">
            <span class="ep-card-num">T${season.seasonNumber} : EP${ep.episodeNumber}</span>
            <span class="ep-card-title">${ep.title}</span>
            <span class="ep-card-dur">${ep.duration}</span>
          </div>
          <span style="font-size: 0.9rem; color: ${isCurrent ? '#e50914' : '#6b7280'}">
            ${isCurrent ? '▶' : '•'}
          </span>
        `;

        playlistContainer.appendChild(card);
      });
    });

    episodeCountBadge.textContent = `${totalEpisodes} eps`;
  }

  // 7. Botões de Cópia para o Rave
  function setupCopyButtons() {
    const handleCopy = () => {
      const url = window.location.href;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url).then(() => {
          showToast('Link do player copiado! Abra o Rave, toque em + e escolha Web.');
        }).catch(() => {
          fallbackCopy(url);
        });
      } else {
        fallbackCopy(url);
      }
    };

    if (copyUrlBtn) copyUrlBtn.addEventListener('click', handleCopy);
    if (copyRaveBtnTop) copyRaveBtnTop.addEventListener('click', handleCopy);
  }

  function fallbackCopy(text) {
    const input = document.createElement('input');
    input.value = text;
    input.style.position = 'fixed';
    input.style.opacity = '0';
    document.body.appendChild(input);
    input.select();
    try {
      document.execCommand('copy');
      showToast('Link do player copiado para o Rave!');
    } catch (e) {
      alert(`Copie o link: ${text}`);
    }
    document.body.removeChild(input);
  }

  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3500);
  }

  // 8. Diagnóstico de Vídeo
  function setupVideoDiagnostics() {
    videoPlayer.addEventListener('error', () => {
      const err = videoPlayer.error;
      console.error('Erro de reprodução de vídeo:', err);
    });
  }

  // Inicializar
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPlayer);
  } else {
    initPlayer();
  }

})();
