/*
  Playtime by B.

  The page itself is a heading and a link to Instagram. The print and textile
  items below are retained here with show: false — the client asked for them off
  the page, not deleted, so they can be switched back on once she has somewhere
  for them to point.
*/

export interface PlaytimeItem {
  label: string
  url: string
  show: boolean
}

export const PLAYTIME_ITEMS: PlaytimeItem[] = [
  { label: 'A Striped Family', url: '#', show: false }, // TODO: destination
  { label: 'Florals', url: '#', show: false },          // TODO: destination
  { label: 'Tie Dye & Ink', url: '#', show: false },    // TODO: destination
]
