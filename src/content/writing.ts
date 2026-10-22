/*
  Writing — publications and essays.

  All entries live here rather than in the page markup, so this file maps
  cleanly onto a CMS collection later: one record per entry, same five fields.

  The client supplied titles only. No image, date, publication detail or link
  was given for any entry, so each carries explicit placeholder values rather
  than invented ones — a plausible-looking date or venue on a publication list
  would be a fabricated bibliographic record.
*/

export interface WritingEntry {
  title: string
  /** MM.YYYY, or "[MM.YYYY]" while awaiting the real date. */
  date: string
  /** Publication or venue. */
  details: string
  /** Empty string renders the image placeholder box. */
  image: string
  url: string
  /** true when `url` is a real destination the client confirmed. */
  hasRealUrl?: boolean
}

export const WRITING_ENTRIES: WritingEntry[] = [
  {
    title: 'Kantabeast',
    date: '[MM.YYYY]',
    details: '[PLACEHOLDER: details] — video essay',
    image: '',
    url: '#', // TODO: client to supply destination
  },
  {
    title: 'Utopian Resurgence',
    date: '[MM.YYYY]',
    details: '[PLACEHOLDER: details]',
    image: '',
    // TODO: the link the client supplied is a private folder and must not be
    // published in this repo. Awaiting a public destination.
    url: '#'
  },
  {
    title: 'Kantamanto Social Club',
    date: '[MM.YYYY]',
    details: '[PLACEHOLDER: details]',
    image: '',
    url: 'https://www.instagram.com/kantamantosocialclub/',
    hasRealUrl: true,
  },
  {
    title: 'Stop Waste Colonialism Campaign / Policy Design',
    date: '[MM.YYYY]',
    details: '[PLACEHOLDER: details]',
    image: '',
    // The one entry with a confirmed destination: its existing project page.
    url: '/archive/waste-colonialism',
    hasRealUrl: true,
  },
  {
    title: 'Clothing Passports (Paper + Passport Photo Shoot)',
    date: '[MM.YYYY]',
    details: '[PLACEHOLDER: details]',
    image: '',
    url: '#', // TODO: client to supply destination
  },
]
