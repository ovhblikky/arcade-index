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
  { id: 'retro-bowl', title: 'Retro Bowl', type: 'sports', meta: 'AMERICAN FOOTBALL / 10 MIN', symbol: '🏈', url: 'https://4yqt7wrhtx-ship-it.github.io/driving-games/retro-bowl/' },
  { id: 'subway-surfers', title: 'Subway Surfers', type: 'runner', meta: 'ENDLESS RUNNER / 05 MIN', symbol: '🚇', url: 'https://files.gamezhero.com/game/905/1d1/9051d1173be765fb/data/index.html' },
  { id: 'moto-x3m', title: 'Moto X3M', type: 'racing', meta: 'BIKE / 10 MIN', symbol: '🏍️', url: 'https://moto-x3mgame.github.io/a8/moto-x3m/' },
  { id: 'slow-roads', title: 'Slow Roads', type: 'chill', meta: 'DRIVING / 20 MIN', symbol: '〰', url: 'https://slowroads.io/' },
  { id: 'the-wiki-game', title: 'The Wiki Game', type: 'challenge', meta: 'TRIVIA / 08 MIN', symbol: 'W', url: 'https://www.thewikigame.com/' },
  { id: 'eaglercraft', title: 'Eaglercraft', type: 'sandbox', meta: 'BUILDING / LONG PLAY', symbol: '▣', url: 'https://eaglercraftnew-mc.vercel.app/' },
  { id: 'wordle-daily', title: 'Wordle', type: 'word', meta: 'DAILY / 05 MIN', symbol: 'W', url: 'https://mikhad.github.io/wordle/#daily' },
  { id: 'flappy-bird', title: 'Flappy Bird', type: 'quick', meta: 'ARCADE / 03 MIN', symbol: '🐦', url: 'https://flappybirdonline.gitlab.io/file/' },
  { id: 'solitairey', title: 'Solitairey', type: 'chill', meta: 'CARD GAME / 15 MIN', symbol: '♠', url: 'https://foss-card-games.github.io/Solitairey/' },
  { id: 'neal-fun', title: "That's Not My Neighbor", type: 'challenge', meta: 'HORROR / 15 MIN', symbol: '🚪', url: 'https://thatsnotmyneighbor.online/v11/' },
  { id: 'granny', title: 'Granny', type: 'challenge', meta: 'HORROR / 10 MIN', symbol: '👵', url: 'https://db.duckmath.org/html/granny/' },
  { id: 'ultrakill-prelude', title: 'Ultrakill Prelude', type: 'challenge', meta: 'SHOOTER / 12 MIN', symbol: '☠', url: 'https://html5.gdata1.com/ULTRAKILL%20Prelude/?v=20250827221755' },
  { id: 'house-of-hazards', title: 'House of Hazards', type: 'challenge', meta: 'PARTY / 10 MIN', symbol: '🏠', url: 'https://houseofhazards.com/' },
  { id: 'uno', title: 'UNO', type: 'card', meta: 'CARD GAME / 10 MIN', symbol: '🃏', url: 'https://uno.guilherr.me/' },
  { id: 'mortal-kombat-trilogy', title: 'Mortal Kombat Trilogy', type: 'fighting', meta: 'FIGHTING / 15 MIN', symbol: '⚔', url: 'https://classicjoy.games/embed?slug=mortal-kombat-trilogy&internal=1' },
  { id: 'polytrack', title: 'Polytrack', type: 'racing', meta: 'RACING / 10 MIN', symbol: '🏁', url: 'https://gr4ys0n.github.io/public/assets/games/poly-track/index.html' },
  { id: 'soccer-skills-world-cup', title: 'Soccer Skills World Cup', type: 'sports', meta: 'SOCCER / 10 MIN', symbol: '⚽', url: 'https://classroom8.github.io/soccer-skills-world-cup/#topvaz' }
];

const grid = document.querySelector('#gameGrid');
const count = document.querySelector('#gameCount');
const emptyState = document.querySelector('#emptyState');
const searchInput = document.querySelector('#searchInput');
const filterTabs = document.querySelector('#filterTabs');
const toast = document.querySelector('#toast');
let activeFilter = 'all';
let previouslyFocused;
const suggestionForm = document.querySelector('#suggestionForm');
const suggestionList = document.querySelector('#suggestionList');
const suggestionTitle = document.querySelector('#suggestionTitle');
const suggestionUrl = document.querySelector('#suggestionUrl');
const suggestionNote = document.querySelector('#suggestionNote');
const suggestionRecipient = '837842@scienceandtech.org';
const escapeHtml = (value) => String(value ?? '').replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character]));
const labelForType = (type) => type.replace(/[-_]+/g, ' ').replace(/\b\w/g, (letter) => letter.toUpperCase());

function addSuggestion(event) {
  event.preventDefault();
  const title = suggestionTitle.value.trim();
  const url = suggestionUrl.value.trim();
  const note = suggestionNote.value.trim();
  if (!title || !url) return showToast('Add a title and a link first.');
  try { const validUrl = new URL(url); if (!validUrl.protocol.startsWith('http')) throw new Error(); }
  catch { return showToast('That URL looks invalid.'); }
  const subject = `Arcade game suggestion: ${title}`;
  const body = `Game name: ${title}\nLink: ${url}${note ? `\nWhy it fits: ${note}` : ''}`;
  window.location.href = `mailto:${suggestionRecipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  suggestionForm.reset();
  showToast(`Opening your email app to send to ${suggestionRecipient}.`);
}

function renderSuggestions() {
  suggestionList.innerHTML = '<li class="empty-suggestions">Suggestions are sent by email.</li>';
}
function addGameModal() {
  const style = document.createElement('style');
  style.textContent = `.game-modal{position:fixed;inset:0;z-index:1000;display:grid;place-items:center;padding:24px;background:rgba(23,23,23,.78);opacity:0;visibility:hidden;transition:opacity .22s ease,visibility .22s ease}.game-modal.is-open{opacity:1;visibility:visible}.game-modal-panel{position:relative;width:min(100%,1100px);height:min(78vh,760px);border-radius:20px;background:#101010;border:1px solid rgba(255,255,255,.1);box-shadow:0 24px 60px rgba(0,0,0,.5);overflow:hidden}.game-modal-header{display:flex;align-items:center;justify-content:space-between;gap:18px;padding:18px 22px;border-bottom:1px solid rgba(255,255,255,.08);background:rgba(255,255,255,.02)}.game-modal-title{margin:0;font-size:clamp(1.1rem,2vw,1.7rem)}.game-modal-meta{margin:4px 0 0;color:#b9b9b9;font-size:.8rem;letter-spacing:.12em;text-transform:uppercase}.game-modal-actions{display:flex;gap:8px}.game-modal-button{border:1px solid rgba(255,255,255,.12);background:rgba(255,255,255,.04);color:#fff;border-radius:999px;height:36px;width:36px;display:grid;place-items:center;cursor:pointer}.game-modal-frame{display:block;width:100%;height:calc(100% - 74px);border:0;background:#000}@media(max-width:640px){.game-modal-panel{height:70vh}.game-modal-header{padding:12px 14px}}`;
  document.head.append(style);
  const modal = document.createElement('div');
  modal.className = 'game-modal'; modal.id = 'gameModal'; modal.setAttribute('role', 'dialog'); modal.setAttribute('aria-modal', 'true');
  modal.innerHTML = `<div class="game-modal-panel"><header class="game-modal-header"><div><h2 class="game-modal-title" id="gameModalTitle"></h2><p class="game-modal-meta" id="gameModalMeta"></p></div><div class="game-modal-actions"><button class="game-modal-button game-modal-fullscreen" type="button" aria-label="Enter full screen">⤢</button><button class="game-modal-button game-modal-close" type="button" aria-label="Close game">✕</button></div></header><iframe id="gameModalFrame" class="game-modal-frame" loading="lazy" title="Game window"></iframe></div>`;
  document.body.append(modal); return modal;
}
const gameModal = addGameModal();
const gamePanel = gameModal.querySelector('.game-modal-panel');
const gameFrame = gameModal.querySelector('#gameModalFrame');
const gameModalTitle = gameModal.querySelector('#gameModalTitle');
const gameModalMeta = gameModal.querySelector('#gameModalMeta');
const fullscreenGameButton = gameModal.querySelector('.game-modal-fullscreen');
const closeGameButton = gameModal.querySelector('.game-modal-close');
function updateFullscreenButton() { const isFullscreen = document.fullscreenElement === gamePanel; fullscreenGameButton.title = isFullscreen ? 'Exit full screen' : 'Enter full screen'; fullscreenGameButton.setAttribute('aria-label', fullscreenGameButton.title); }
async function toggleGameFullscreen() { try { if (document.fullscreenElement === gamePanel) await document.exitFullscreen(); else if (gamePanel.requestFullscreen) await gamePanel.requestFullscreen(); else showToast('Full screen is not supported in this browser.'); } catch { showToast('Full screen was blocked by the browser.'); } }
function closeGame() { if (document.fullscreenElement === gamePanel) document.exitFullscreen().catch(() => {}); gameModal.classList.remove('is-open'); gameModal.setAttribute('aria-hidden', 'true'); gameFrame.src = 'about:blank'; if (previouslyFocused) previouslyFocused.focus(); }
function openGame(game) { previouslyFocused = document.activeElement; gameModalTitle.textContent = game.title; gameModalMeta.textContent = game.meta || game.type || 'GAME'; gameFrame.title = `${game.title} game`; gameFrame.src = game.url; gameModal.classList.add('is-open'); gameModal.removeAttribute('aria-hidden'); closeGameButton.focus(); updateFullscreenButton(); }
fullscreenGameButton.addEventListener('click', toggleGameFullscreen); document.addEventListener('fullscreenchange', updateFullscreenButton); closeGameButton.addEventListener('click', closeGame); gameModal.addEventListener('click', (event) => { if (event.target === gameModal) closeGame(); }); document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && gameModal.classList.contains('is-open') && !document.fullscreenElement) closeGame(); });

function renderFilters() { const filters = ['all', ...new Set(games.map((game) => game.type).filter(Boolean))]; if (!filters.includes(activeFilter)) activeFilter = 'all'; filterTabs.innerHTML = filters.map((type) => `<button class="filter${type === activeFilter ? ' active' : ''}" data-filter="${escapeHtml(type)}" role="tab" aria-selected="${type === activeFilter}">${type === 'all' ? 'All games' : escapeHtml(labelForType(type))}</button>`).join(''); filterTabs.querySelectorAll('.filter').forEach((button) => button.addEventListener('click', () => { activeFilter = button.dataset.filter; renderFilters(); renderGames(); })); }
function visibleGames() { const query = searchInput.value.toLowerCase().trim(); return games.filter((game) => { const searchable = `${game.title} ${game.type} ${game.meta} ${game.description || ''}`.toLowerCase(); return (activeFilter === 'all' || game.type === activeFilter) && searchable.includes(query); }); }
function renderGames() { const visible = visibleGames(); grid.innerHTML = visible.map((game, index) => `<article class="game-card" style="animation-delay:${index * 45}ms" data-game-id="${escapeHtml(game.id || game.title)}" tabindex="0" role="button" aria-label="Play ${escapeHtml(game.title)}"><div class="game-cover"><span class="cover-symbol">${escapeHtml(game.symbol || '✦')}</span></div><div class="card-info"><div><h3>${escapeHtml(game.title)}</h3><p class="card-meta">${escapeHtml(game.meta || game.type || 'GAME')}</p></div><span class="play-link">↗</span></div></article>`).join(''); count.textContent = `${String(visible.length).padStart(2, '0')} / ${games.length} GAMES`; emptyState.hidden = visible.length > 0; }
function showToast(message, duration = 2200) { toast.textContent = message; toast.classList.add('show'); clearTimeout(showToast.timeout); showToast.timeout = setTimeout(() => toast.classList.remove('show'), duration); }
function launchGame(game) { if (game.url) openGame(game); else showToast(`${game.title} is warming up...`); }
function handleCard(event) { const card = event.target.closest('.game-card'); if (!card || (event.type === 'keydown' && !['Enter', ' '].includes(event.key))) return; event.preventDefault(); const game = games.find((item) => String(item.id || item.title) === card.dataset.gameId); if (game) launchGame(game); }

suggestionForm.addEventListener('submit', addSuggestion);
const suggestionSubmit = suggestionForm.querySelector('.suggestion-submit');
if (suggestionSubmit) suggestionSubmit.textContent = 'Email the suggestion';
renderSuggestions(); grid.addEventListener('click', handleCard); grid.addEventListener('keydown', handleCard); searchInput.addEventListener('input', renderGames);
document.querySelector('#randomButton').addEventListener('click', () => { const pool = visibleGames(); if (!pool.length) return showToast('No games match those filters.'); const game = pool[Math.floor(Math.random() * pool.length)]; showToast(`Try ${game.title} — ${(game.meta || game.type || 'game').toLowerCase()}`, 2600); });
renderFilters(); renderGames();
