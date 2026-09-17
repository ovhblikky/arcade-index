const games = [
  { title: 'Orbit Club', type: 'quick', meta: 'ARCADE / 04 MIN', symbol: '✺' },
  { title: 'Letterpress', type: 'chill', meta: 'WORD / 12 MIN', symbol: 'Aa' },
  { title: 'Tiny Islands', type: 'chill', meta: 'PUZZLE / 20 MIN', symbol: '⌁' },
  { title: 'Hexagon', type: 'challenge', meta: 'LOGIC / 08 MIN', symbol: '⬡' },
  { title: 'Colour Theory', type: 'quick', meta: 'ARCADE / 03 MIN', symbol: '◒' },
  { title: 'Night Shift', type: 'challenge', meta: 'STRATEGY / 18 MIN', symbol: '☾' },
  { title: 'Driftwood', type: 'chill', meta: 'SIM / 25 MIN', symbol: '≈' },
  { title: 'Stack Attack', type: 'challenge', meta: 'SKILL / 06 MIN', symbol: '▥' },
  { title: 'Paper Planes', type: 'quick', meta: 'ARCADE / 05 MIN', symbol: '➤' },
  { title: 'Moss', type: 'chill', meta: 'EXPLORATION / 15 MIN', symbol: '✣' },
  { title: 'Gridlock', type: 'challenge', meta: 'LOGIC / 11 MIN', symbol: '▦' },
  { title: 'Pong Again', type: 'quick', meta: 'ARCADE / 02 MIN', symbol: '│' }
];

const grid = document.querySelector('#gameGrid');
const count = document.querySelector('#gameCount');
const emptyState = document.querySelector('#emptyState');
const searchInput = document.querySelector('#searchInput');
const toast = document.querySelector('#toast');
let activeFilter = 'all';

function renderGames() {
  const query = searchInput.value.toLowerCase().trim();
  const visible = games.filter((game) => {
    const matchesFilter = activeFilter === 'all' || game.type === activeFilter;
    const matchesSearch = game.title.toLowerCase().includes(query) || game.meta.toLowerCase().includes(query);
    return matchesFilter && matchesSearch;
  });

  grid.innerHTML = visible.map((game, index) => `
    <article class="game-card" style="animation-delay: ${index * 45}ms" data-game="${game.title}">
      <div class="game-cover"><span class="cover-symbol">${game.symbol}</span></div>
      <div class="card-info"><div><h3>${game.title}</h3><p class="card-meta">${game.meta}</p></div><span class="play-link">↗</span></div>
    </article>
  `).join('');
  count.textContent = `${String(visible.length).padStart(2, '0')} / 24 GAMES`;
  emptyState.hidden = visible.length > 0;
}

document.querySelectorAll('.filter').forEach((button) => {
  button.addEventListener('click', () => {
    activeFilter = button.dataset.filter;
    document.querySelectorAll('.filter').forEach((item) => {
      const selected = item === button;
      item.classList.toggle('active', selected);
      item.setAttribute('aria-selected', selected);
    });
    renderGames();
  });
});

searchInput.addEventListener('input', renderGames);
grid.addEventListener('click', (event) => {
  const card = event.target.closest('.game-card');
  if (!card) return;
  toast.textContent = `${card.dataset.game} is warming up...`;
  toast.classList.add('show');
  window.setTimeout(() => toast.classList.remove('show'), 2200);
});

document.querySelector('#randomButton').addEventListener('click', () => {
  const game = games[Math.floor(Math.random() * games.length)];
  toast.textContent = `Try ${game.title} — ${game.meta.toLowerCase()}`;
  toast.classList.add('show');
  window.setTimeout(() => toast.classList.remove('show'), 2600);
});

renderGames();
