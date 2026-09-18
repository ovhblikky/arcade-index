// Add, remove, or rename entries here. Any type or genre is supported.
// Give a game a `url` to launch it; without one, the card shows a coming-soon message.
const games = [
  { id: 'orbit-club', title: 'Orbit Club', type: 'quick', meta: 'ARCADE / 04 MIN', symbol: '✺' },
  { id: 'letterpress', title: 'Letterpress', type: 'chill', meta: 'WORD / 12 MIN', symbol: 'Aa' },
  { id: 'tiny-islands', title: 'Tiny Islands', type: 'chill', meta: 'PUZZLE / 20 MIN', symbol: '⌁' },
  { id: 'hexagon', title: 'Hexagon', type: 'challenge', meta: 'LOGIC / 08 MIN', symbol: '⬡' },
  { id: 'colour-theory', title: 'Colour Theory', type: 'quick', meta: 'ARCADE / 03 MIN', symbol: '◒' },
  { id: 'night-shift', title: 'Night Shift', type: 'challenge', meta: 'STRATEGY / 18 MIN', symbol: '☾' },
  { id: 'driftwood', title: 'Driftwood', type: 'chill', meta: 'SIM / 25 MIN', symbol: '≈' },
  { id: 'stack-attack', title: 'Stack Attack', type: 'challenge', meta: 'SKILL / 06 MIN', symbol: '▥' },
  { id: 'paper-planes', title: 'Paper Planes', type: 'quick', meta: 'ARCADE / 05 MIN', symbol: '➤' },
  { id: 'moss', title: 'Moss', type: 'chill', meta: 'EXPLORATION / 15 MIN', symbol: '✣' },
  { id: 'gridlock', title: 'Gridlock', type: 'challenge', meta: 'LOGIC / 11 MIN', symbol: '▦' },
  { id: 'pong-again', title: 'Pong Again', type: 'quick', meta: 'ARCADE / 02 MIN', symbol: '│' },
  { id: 'retro-bowl', title: 'Retro Bowl', type: 'sports', meta: 'AMERICAN FOOTBALL / 10 MIN', symbol: '🏈', url: 'https://retro-bowl-unbl0cked.github.io/' },
  { id: 'subway-surfers', title: 'Subway Surfers', type: 'runner', meta: 'ENDLESS RUNNER / 05 MIN', symbol: '🚇', url: 'https://subwaysurfers76.github.io/' },
  { id: 'moto-x3m', title: 'Moto X3M', type: 'racing', meta: 'BIKE / 10 MIN', symbol: '🏍️', url: 'https://moto3xmbike.github.io/' },
  { id: 'infinite-craft', title: 'Infinite Craft', type: 'chill', meta: 'CREATION / 20 MIN', symbol: '∞', url: 'https://neal.fun/infinite-craft/' },
  { id: 'the-wiki-game', title: 'The Wiki Game', type: 'challenge', meta: 'TRIVIA / 08 MIN', symbol: 'W', url: 'https://www.thewikigame.com/' }
];

const grid = document.querySelector('#gameGrid');
const count = document.querySelector('#gameCount');
const emptyState = document.querySelector('#emptyState');
const searchInput = document.querySelector('#searchInput');
const filterTabs = document.querySelector('#filterTabs');
const toast = document.querySelector('#toast');
let activeFilter = 'all';
let previouslyFocused;

const escapeHtml = (value) => String(value ?? '').replace(/[&<>"']/g, (character) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
}[character]));

const labelForType = (type) => type.replace(/[-_]+/g, ' ').replace(/\b\w/g, (letter) => letter.toUpperCase());

function addGameModal() {
  const style = document.createElement('style');
  style.textContent = `
    .game-modal { position: fixed; inset: 0; z-index: 1000; display: grid; place-items: center; padding: 24px; background: rgba(23,23,23,.78); opacity: 0; visibility: hidden; transition: opacity .2s ease, visibility .2s ease; }
    .game-modal.is-open { opacity: 1; visibility: visible; }
    .game-modal-panel { width: min(1100px, 100%); height: min(760px, 92vh); display: flex; flex-direction: column; background: var(--paper); box-shadow: 8px 8px 0 var(--ink); transform: translateY(14px); transition: transform .2s ease; }
    .game-modal.is-open .game-modal-panel { transform: none; }
    .game-modal-header { display: flex; align-items: center; justify-content: space-between; gap: 16px; min-height: 58px; padding: 10px 16px 10px 20px; border-bottom: 1px solid var(--line); }
    .game-modal-title { margin: 0; font-size: 16px; font-weight: 500; }
    .game-modal-meta { margin: 4px 0 0; color: var(--muted); font: 10px var(--mono); }
    .game-modal-close { width: 34px; height: 34px; border: 1px solid var(--ink); background: transparent; color: var(--ink); cursor: pointer; font-size: 22px; line-height: 1; }
    .game-modal-close:hover, .game-modal-close:focus-visible { background: var(--ink); color: var(--paper); }
    .game-modal-frame { flex: 1; width: 100%; min-height: 0; border: 0; background: #fff; }
    @media (max-width: 600px) { .game-modal { padding: 10px; } .game-modal-panel { height: 94vh; box-shadow: 4px 4px 0 var(--ink); } }
  `;
  document.head.append(style);
  const modal = document.createElement('div');
  modal.className = 'game-modal';
  modal.id = 'gameModal';
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');
  modal.setAttribute('aria-labelledby', 'gameModalTitle');
  modal.innerHTML = `
    <div class="game-modal-panel" role="document">
      <header class="game-modal-header">
        <div><h2 class="game-modal-title" id="gameModalTitle"></h2><p class="game-modal-meta" id="gameModalMeta"></p></div>
        <button class="game-modal-close" type="button" aria-label="Close game">×</button>
      </header>
      <iframe class="game-modal-frame" id="gameModalFrame" title="Game" allow="fullscreen; gamepad" referrerpolicy="no-referrer"></iframe>
    </div>`;
  document.body.append(modal);
  return modal;
}

const gameModal = addGameModal();
const gameFrame = gameModal.querySelector('#gameModalFrame');
const gameModalTitle = gameModal.querySelector('#gameModalTitle');
const gameModalMeta = gameModal.querySelector('#gameModalMeta');
const closeGameButton = gameModal.querySelector('.game-modal-close');

function closeGame() {
  gameModal.classList.remove('is-open');
  gameModal.setAttribute('aria-hidden', 'true');
  gameFrame.src = 'about:blank';
  if (previouslyFocused) previouslyFocused.focus();
}

function openGame(game) {
  previouslyFocused = document.activeElement;
  gameModalTitle.textContent = game.title;
  gameModalMeta.textContent = game.meta || game.type || 'GAME';
  gameFrame.title = `${game.title} game`;
  gameFrame.src = game.url;
  gameModal.classList.add('is-open');
  gameModal.removeAttribute('aria-hidden');
  closeGameButton.focus();
}

closeGameButton.addEventListener('click', closeGame);
gameModal.addEventListener('click', (event) => {
  if (event.target === gameModal) closeGame();
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && gameModal.classList.contains('is-open')) closeGame();
});

function renderFilters() {
  const types = [...new Set(games.map((game) => game.type).filter(Boolean))];
  const filters = ['all', ...types];
  if (!filters.includes(activeFilter)) activeFilter = 'all';
  filterTabs.innerHTML = filters.map((type) => `
    <button class="filter${type === activeFilter ? ' active' : ''}" data-filter="${escapeHtml(type)}" role="tab" aria-selected="${type === activeFilter}">
      ${type === 'all' ? 'All games' : escapeHtml(labelForType(type))}
    </button>
  `).join('');
  filterTabs.querySelectorAll('.filter').forEach((button) => {
    button.addEventListener('click', () => {
      activeFilter = button.dataset.filter;
      renderFilters();
      renderGames();
    });
  });
}

function visibleGames() {
  const query = searchInput.value.toLowerCase().trim();
  return games.filter((game) => {
    const searchable = `${game.title} ${game.type} ${game.meta} ${game.description || ''}`.toLowerCase();
    return (activeFilter === 'all' || game.type === activeFilter) && searchable.includes(query);
  });
}

function renderGames() {
  const visible = visibleGames();
  grid.innerHTML = visible.map((game, index) => `
    <article class="game-card" style="animation-delay: ${index * 45}ms" data-game-id="${escapeHtml(game.id || game.title)}" tabindex="0" role="button" aria-label="Play ${escapeHtml(game.title)}">
      <div class="game-cover"><span class="cover-symbol">${escapeHtml(game.symbol || '✦')}</span></div>
      <div class="card-info"><div><h3>${escapeHtml(game.title)}</h3><p class="card-meta">${escapeHtml(game.meta || game.type || 'GAME')}</p></div><span class="play-link">↗</span></div>
    </article>
  `).join('');
  count.textContent = `${String(visible.length).padStart(2, '0')} / ${games.length} GAMES`;
  emptyState.hidden = visible.length > 0;
}

function showToast(message, duration = 2200) {
  toast.textContent = message;
  toast.classList.add('show');
  window.clearTimeout(showToast.timeout);
  showToast.timeout = window.setTimeout(() => toast.classList.remove('show'), duration);
}

function launchGame(game) {
  if (game.url) {
    openGame(game);
    return;
  }
  showToast(`${game.title} is warming up...`);
}

function handleCard(event) {
  const card = event.target.closest('.game-card');
  if (!card) return;
  if (event.type === 'keydown' && event.key !== 'Enter' && event.key !== ' ') return;
  event.preventDefault();
  const game = games.find((item) => String(item.id || item.title) === card.dataset.gameId);
  if (game) launchGame(game);
}

grid.addEventListener('click', handleCard);
grid.addEventListener('keydown', handleCard);
searchInput.addEventListener('input', renderGames);
document.querySelector('#randomButton').addEventListener('click', () => {
  const pool = visibleGames();
  if (!pool.length) return showToast('No games match those filters.');
  const game = pool[Math.floor(Math.random() * pool.length)];
  showToast(`Try ${game.title} — ${(game.meta || game.type || 'game').toLowerCase()}`, 2600);
});

renderFilters();
renderGames();
