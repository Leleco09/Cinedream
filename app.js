/**
 * CinePrivado - Lógica do Catálogo Principal
 */

(function () {
  'use strict';

  // Estado da Aplicação
  let activeType = 'all';      // 'all' | 'movie' | 'series'
  let activeGenre = 'all';     // 'all' | 'Gênero'
  let searchQuery = '';
  let currentModalItem = null;

  // Elementos do DOM
  const searchInput = document.getElementById('searchInput');
  const clearSearchBtn = document.getElementById('clearSearchBtn');
  const navTabs = document.querySelectorAll('.tab-btn');
  const genresBar = document.getElementById('genresBar');
  const catalogGrid = document.getElementById('catalogGrid');
  const emptyState = document.getElementById('emptyState');
  const itemCount = document.getElementById('itemCount');
  const catalogHeading = document.getElementById('catalogHeading');

  // Hero Banner
  const heroCard = document.getElementById('heroCard');
  const heroTitle = document.getElementById('heroTitle');
  const heroRating = document.getElementById('heroRating');
  const heroYear = document.getElementById('heroYear');
  const heroDuration = document.getElementById('heroDuration');
  const heroDesc = document.getElementById('heroDesc');
  const heroPlayBtn = document.getElementById('heroPlayBtn');
  const heroDetailsBtn = document.getElementById('heroDetailsBtn');

  // Modal
  const detailsModal = document.getElementById('detailsModal');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const modalBanner = document.getElementById('modalBanner');
  const modalTypeBadge = document.getElementById('modalTypeBadge');
  const modalTitle = document.getElementById('modalTitle');
  const modalRating = document.getElementById('modalRating');
  const modalYear = document.getElementById('modalYear');
  const modalDuration = document.getElementById('modalDuration');
  const modalGenres = document.getElementById('modalGenres');
  const modalSynopsis = document.getElementById('modalSynopsis');
  const movieActionsRow = document.getElementById('movieActionsRow');
  const modalWatchBtn = document.getElementById('modalWatchBtn');
  const modalCopyRaveBtn = document.getElementById('modalCopyRaveBtn');
  const seriesEpisodesSection = document.getElementById('seriesEpisodesSection');
  const episodesListContainer = document.getElementById('episodesListContainer');

  // Toast
  const toast = document.getElementById('toast');

  // Inicialização
  function init() {
    setupHeroBanner();
    buildGenrePills();
    renderCatalog();
    setupEventListeners();
  }

  // 1. Configurar Banner de Destaque
  function setupHeroBanner() {
    if (!DEMO_CATALOG.length) return;
    const featured = DEMO_CATALOG[0]; // Primeiro título como destaque
    heroCard.style.backgroundImage = `url('${featured.backdrop || featured.poster}')`;
    heroTitle.textContent = featured.title;
    heroRating.textContent = `★ ${featured.rating}`;
    heroYear.textContent = featured.year;
    heroDuration.textContent = featured.duration;
    heroDesc.textContent = featured.synopsis;

    heroPlayBtn.onclick = () => {
      window.location.href = `player.html?id=${featured.id}`;
    };

    heroDetailsBtn.onclick = () => {
      openDetailsModal(featured);
    };
  }

  // 2. Extrair e Construir Pílulas de Gêneros
  function buildGenrePills() {
    const genresSet = new Set();
    DEMO_CATALOG.forEach(item => {
      (item.genres || []).forEach(g => genresSet.add(g));
    });

    genresBar.innerHTML = `<button class="genre-pill active" data-genre="all">Todos os Gêneros</button>`;

    genresSet.forEach(genre => {
      const btn = document.createElement('button');
      btn.className = 'genre-pill';
      btn.dataset.genre = genre;
      btn.textContent = genre;
      genresBar.appendChild(btn);
    });
  }

  // 3. Renderizar Catálogo com Filtros
  function renderCatalog() {
    const query = searchQuery.trim().toLowerCase();

    const filtered = DEMO_CATALOG.filter(item => {
      // Filtro de tipo (filme ou série)
      if (activeType !== 'all' && item.type !== activeType) return false;

      // Filtro de gênero
      if (activeGenre !== 'all' && !(item.genres || []).includes(activeGenre)) return false;

      // Filtro de busca (título ou sinopse)
      if (query) {
        const titleMatch = item.title.toLowerCase().includes(query);
        const originalTitleMatch = (item.originalTitle || '').toLowerCase().includes(query);
        const genreMatch = (item.genres || []).some(g => g.toLowerCase().includes(query));
        const synMatch = (item.synopsis || '').toLowerCase().includes(query);
        if (!titleMatch && !originalTitleMatch && !genreMatch && !synMatch) return false;
      }

      return true;
    });

    // Atualiza contadores e títulos
    itemCount.textContent = `${filtered.length} ${filtered.length === 1 ? 'título' : 'títulos'}`;
    
    if (activeType === 'movie') {
      catalogHeading.textContent = 'Filmes Disponíveis';
    } else if (activeType === 'series') {
      catalogHeading.textContent = 'Séries & Temporadas';
    } else {
      catalogHeading.textContent = 'Catálogo Completo';
    }

    catalogGrid.innerHTML = '';

    if (filtered.length === 0) {
      emptyState.style.display = 'block';
      return;
    }

    emptyState.style.display = 'none';

    filtered.forEach(item => {
      const card = document.createElement('article');
      card.className = 'catalog-card';
      card.tabIndex = 0;
      card.setAttribute('role', 'button');
      card.setAttribute('aria-label', `Ver detalhes de ${item.title}`);

      const typeLabel = item.type === 'movie' ? 'FILME' : 'SÉRIE';

      card.innerHTML = `
        <div class="card-poster-wrapper">
          <img src="${item.poster}" alt="Pôster de ${item.title}" class="card-poster" loading="lazy">
          <span class="card-badge-demo">DEMO</span>
          <span class="card-type-tag">${typeLabel}</span>
          <div class="card-overlay-hover">
            <span class="play-circle">▶</span>
          </div>
        </div>
        <div class="card-info">
          <h3 class="card-title">${item.title}</h3>
          <div class="card-meta-line">
            <span>${item.year}</span>
            <span class="rating-pill">★ ${item.rating}</span>
          </div>
        </div>
      `;

      card.addEventListener('click', () => openDetailsModal(item));
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openDetailsModal(item);
        }
      });

      catalogGrid.appendChild(card);
    });
  }

  // 4. Modal de Detalhes
  function openDetailsModal(item) {
    currentModalItem = item;

    modalBanner.style.backgroundImage = `url('${item.backdrop || item.poster}')`;
    modalTypeBadge.textContent = item.type === 'movie' ? 'FILME' : 'SÉRIE';
    modalTitle.textContent = item.title;
    modalRating.textContent = `★ ${item.rating}`;
    modalYear.textContent = item.year;
    modalDuration.textContent = item.duration;
    modalSynopsis.textContent = item.synopsis;

    // Gêneros
    modalGenres.innerHTML = (item.genres || [])
      .map(g => `<span class="genre-tag-sm">${g}</span>`)
      .join('');

    if (item.type === 'movie') {
      movieActionsRow.style.display = 'flex';
      seriesEpisodesSection.style.display = 'none';
      modalWatchBtn.href = `player.html?id=${item.id}`;

      modalCopyRaveBtn.onclick = () => {
        const fullPlayerUrl = getFullUrl(`player.html?id=${item.id}`);
        copyToClipboard(fullPlayerUrl, 'Link do filme para o Rave copiado! Cole no app Rave na opção Web.');
      };
    } else {
      // Série: ocultar botões diretos de filme e exibir lista de episódios
      movieActionsRow.style.display = 'none';
      seriesEpisodesSection.style.display = 'block';

      renderEpisodesList(item);
    }

    detailsModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }

  function closeDetailsModal() {
    detailsModal.style.display = 'none';
    document.body.style.overflow = '';
    currentModalItem = null;
  }

  // 5. Renderizar Lista de Episódios de Séries
  function renderEpisodesList(seriesItem) {
    episodesListContainer.innerHTML = '';

    (seriesItem.seasons || []).forEach(season => {
      const seasonHeader = document.createElement('h5');
      seasonHeader.style.cssText = 'color: #94a3b8; font-size: 0.82rem; margin: 0.75rem 0 0.5rem; text-transform: uppercase;';
      seasonHeader.textContent = season.title || `Temporada ${season.seasonNumber}`;
      episodesListContainer.appendChild(seasonHeader);

      (season.episodes || []).forEach(ep => {
        const epRow = document.createElement('div');
        epRow.className = 'episode-item';

        const playerUrl = `player.html?id=${seriesItem.id}&season=${season.seasonNumber}&ep=${ep.episodeNumber}`;

        epRow.innerHTML = `
          <div class="episode-info">
            <span class="episode-num">Episódio ${ep.episodeNumber}</span>
            <span class="episode-title">${ep.title}</span>
            <span class="episode-duration">${ep.duration}</span>
          </div>
          <div class="episode-btns">
            <a href="${playerUrl}" class="btn btn-primary btn-sm">▶ Assistir</a>
            <button class="btn btn-rave btn-sm copy-ep-rave-btn" title="Copiar link para o Rave">🚀 Rave</button>
          </div>
        `;

        const raveBtn = epRow.querySelector('.copy-ep-rave-btn');
        raveBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          const fullEpUrl = getFullUrl(playerUrl);
          copyToClipboard(fullEpUrl, `Link do Episódio ${ep.episodeNumber} copiado para o Rave!`);
        });

        episodesListContainer.appendChild(epRow);
      });
    });
  }

  // 6. Utilitários (Clipboard & Toast)
  function getFullUrl(relativePath) {
    return new URL(relativePath, window.location.href).href;
  }

  function copyToClipboard(text, successMsg) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        showToast(successMsg);
      }).catch(() => {
        fallbackCopy(text, successMsg);
      });
    } else {
      fallbackCopy(text, successMsg);
    }
  }

  function fallbackCopy(text, successMsg) {
    const input = document.createElement('input');
    input.value = text;
    input.style.position = 'fixed';
    input.style.opacity = '0';
    document.body.appendChild(input);
    input.select();
    try {
      document.execCommand('copy');
      showToast(successMsg);
    } catch (err) {
      alert(`Copie o link manualmente: ${text}`);
    }
    document.body.removeChild(input);
  }

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3800);
  }

  // 7. Event Listeners
  function setupEventListeners() {
    // Busca
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      clearSearchBtn.style.display = searchQuery ? 'block' : 'none';
      renderCatalog();
    });

    clearSearchBtn.addEventListener('click', () => {
      searchInput.value = '';
      searchQuery = '';
      clearSearchBtn.style.display = 'none';
      searchInput.focus();
      renderCatalog();
    });

    // Abas de Tipo (Todos, Filmes, Séries)
    navTabs.forEach(btn => {
      btn.addEventListener('click', () => {
        navTabs.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeType = btn.dataset.type;
        renderCatalog();
      });
    });

    // Pílulas de Gênero
    genresBar.addEventListener('click', (e) => {
      const pill = e.target.closest('.genre-pill');
      if (!pill) return;
      document.querySelectorAll('.genre-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      activeGenre = pill.dataset.genre;
      renderCatalog();
    });

    // Fechar modal
    closeModalBtn.addEventListener('click', closeDetailsModal);
    detailsModal.addEventListener('click', (e) => {
      if (e.target === detailsModal) closeDetailsModal();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && detailsModal.style.display === 'flex') {
        closeDetailsModal();
      }
    });
  }

  // Iniciar após carregamento do DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
