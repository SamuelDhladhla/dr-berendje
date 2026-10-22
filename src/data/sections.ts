import type { HoverListItem } from '@/components/HoverList'

/*
  Writing / Education / Consultancy / Playtime.

  Item names and hierarchy come from the client's Work Flow Doc. No descriptive
  prose is invented here: where the client has not supplied a description, the
  item carries descriptionMissing and renders a visible placeholder marker.

  Where an item names a project that already has an /archive page, it links there
  rather than duplicating the page.
*/

export { INSTAGRAM_URL } from './site'

// ── WRITING — removed. Writing now has its own content file at src/content/writing.ts.


// ── EDUCATION ────────────────────────────────────────────────────────────────
export const EDUCATION: HoverListItem[] = [
  {
    key: 'sender-receiver',
    title: 'Sender – Receiver Residence',
    href: '/archive/sender-receiver-residence',
    descriptionMissing: true,
    subItems: [
      'Curriculum',
      'How did we end up here?',
      'The Good Ancestor To Do List',
      'One Message becomes a Clothing Tag',
      'Closet Audit',
    ],
  },
  {
    key: 'secondhand-speculation',
    title: 'Secondhand Speculation',
    href: '/archive/secondhand-speculation',
    descriptionMissing: true,
    subItems: ['Oracle Deck', 'Berlin Reader', 'Arnhem', 'Accra', 'Ihambane', 'Johannesburg'],
  },
  {
    key: 'craft-of-upcycling',
    title: 'The Craft of Upcycling',
    category: 'Inkube Program',
    href: '#', // TODO: no route yet — client to confirm destination
    hrefTodo: true,
    descriptionMissing: true,
    subItems: [
      'Paper (+ Case Study)',
      'Curriculum',
      'Printemps (Paris) Exhibition 2024',
      'Lookbook',
    ],
  },
  {
    key: 'owo-school',
    title: 'OWO School',
    href: '#', // TODO: no route yet — client to confirm destination
    hrefTodo: true,
    descriptionMissing: true,
    subItems: [
      'Curriculum (Vital Materialism)',
      'Case Study',
      'Lookbook',
      'OWO Festival Exhibition 2025',
    ],
  },
]

// ── CONSULTANCY ──────────────────────────────────────────────────────────────
// NOTE: the client gave no layout reference for this section. The hover-list
// pattern here is extrapolated from Writing/Education for consistency.
// See the report — several items below are filed under PLAYTIME in her document.
export const CONSULTANCY: HoverListItem[] = [
  {
    key: 'julius-holland',
    title: 'Julius Holland',
    category: 'Brand Identity & Strategy',
    href: '#', // TODO: no route yet
    hrefTodo: true,
    descriptionMissing: true,
    subItems: ['Brand Identity & Strategy for a luxury African wax print'],
  },
  {
    key: 'speculative-futures',
    title: 'Speculative Futures',
    category: 'Julius Holland — video LABOOMZ',
    href: '#', // TODO: no route yet
    hrefTodo: true,
    descriptionMissing: true,
    subItems: ['The Style Hack', '(Cross Cultural) Productions'],
  },
  {
    key: 'lagos',
    title: 'Lagos',
    href: '#', // TODO: no route yet
    hrefTodo: true,
    descriptionMissing: true,
    subItems: ['Slay Mamma', 'Yoye', 'Every Day Lagos is Couture', 'Series of Interviews'],
  },
  {
    key: 'kano',
    title: 'Kano',
    href: '#', // TODO: no route yet
    hrefTodo: true,
    descriptionMissing: true,
    subItems: ['Victoire Magic x Wamball', 'Julius', 'Ali Jita'],
  },
  {
    key: 'abuja',
    title: 'Abuja',
    href: '#', // TODO: no route yet
    hrefTodo: true,
    descriptionMissing: true,
    subItems: ['Soul in Motion'],
  },
  {
    key: 'accra',
    title: 'Accra',
    href: '#', // TODO: no route yet
    hrefTodo: true,
    descriptionMissing: true,
    subItems: ['Victoire Magic Princess', 'Soul in Motion'],
  },
]

// ── PLAYTIME — removed. Playtime is a heading and an Instagram link; it has no list.

