# ovhbllikky

A small, data-driven arcade index.

## Adding games

Games are configured in `script.js` through the `games` array. Each entry can use any `type` value; the filter bar is generated automatically from the values in that array. A game can link to any playable experience by setting `url`:

```js
{
  id: 'my-game',
  title: 'My Game',
  type: 'multiplayer',
  meta: 'WEB / 10 MIN',
  symbol: '◎',
  url: './games/my-game/index.html'
}
```

`id`, `title`, `type`, `meta`, and `symbol` are enough for a catalogue entry. If `url` is omitted, selecting the card displays a warming-up message instead of opening a game. Search covers the title, type, metadata, and optional description.
