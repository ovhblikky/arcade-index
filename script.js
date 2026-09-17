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
  { id: 'pong-again', title: 'Pong Again', type: 'quick', meta: 'ARCADE / 02 MIN', symbol: '│' }
];

const grid = document.querySelector('#gameGrid');
const count = document.querySelector('#gameCount');
const emptyState = document.querySelector('#emptyState');
const searchInput = document.querySelector('#searchInput');
const filterTabs = document.querySelector('#filterTabs');
const toast = document.querySelector('#toast');
let activeFilter = 'all';

const escapeHtml = (value) => String(value ?? '').replace(/[&<>'"]/g, (character) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
}[character]));

const labelForType = (type) => type.replace(/[-_]+/g, ' ').replace(/\b\w/g, (letter) => letter.toUpperCase());

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
    window.open(game.url, game.url.startsWith('#') ? '_self' : '_blank', 'noopener');
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
