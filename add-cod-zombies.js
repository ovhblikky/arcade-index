// Adds a COD: Zombies entry to the existing games array and refreshes the UI.
(function(){
  try {
    if (!window.games) {
      console.warn('games array not found on window; cannot add COD: Zombies.');
      return;
    }

    // Don't add if an entry with the same id already exists
    if (games.some(g => g.id === 'cod-zombies')) {
      console.log('COD: Zombies already present.');
      return;
    }

    games.push({
      id: 'cod-zombies',
      title: 'COD: Zombies',
      type: 'shooter',
      meta: 'SHOOTER / 15 MIN',
      symbol: '☠',
      url: 'https://example.com/cod-zombies/'
    });

    // Rebuild filters and visible grid
    if (typeof renderFilters === 'function') renderFilters();
    if (typeof renderGames === 'function') renderGames();

    console.log('COD: Zombies added to games list');
  } catch (err) {
    console.error('Failed to add COD: Zombies', err);
  }
})();
