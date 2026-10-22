/*
  Education — programmes and their nested items.

  Structure follows the client's own hierarchy. Where a programme has an
  existing project page it links there; everything else is "#" + TODO until she
  confirms a destination. Full curricula are deliberately NOT published here —
  only the names of the parts.
*/

export interface EducationItem {
  label: string
  href: string
  /** Items nested one level under this one. */
  children?: EducationItem[]
}

export const EDUCATION_ITEMS: EducationItem[] = [
  {
    label: 'Sender – Receiver Residence',
    href: '/archive/sender-receiver-residence',
    children: [
      {
        label: 'Curriculum',
        href: '#', // TODO: client to supply destination
        children: [
          { label: 'How did we end up here?', href: '#' }, // TODO
          { label: 'The Good Ancestor To do List', href: '#' }, // TODO
          { label: 'One Message becomes a Clothing Tag', href: '#' }, // TODO
          { label: 'Closet Audit', href: '#' }, // TODO
        ],
      },
    ],
  },
  {
    label: 'Secondhand Speculation',
    href: '/archive/secondhand-speculation',
    children: [
      {
        label: 'Oracle Deck (Methodology)',
        href: '#', // TODO: client to supply destination
        children: [
          { label: 'Berlin Reader', href: '#' }, // TODO
          { label: 'Arnhem', href: '#' }, // TODO
          { label: 'Accra', href: '#' }, // TODO
          // Spelled as the client wrote it. Likely "Inhambane" — see FLAGS.
          { label: 'Ihambane', href: '#' }, // TODO
          { label: 'Johannesburg (AFRI)', href: '#' }, // TODO
        ],
      },
    ],
  },
  {
    label: 'The Craft of Upcycling (Inkube Program)',
    href: '#', // TODO: client to supply destination
    children: [
      { label: 'Paper (+ Case Study)', href: '#' }, // TODO
      { label: 'Curriculum', href: '#' }, // TODO
      { label: 'Printemps (Paris) Exhibition (The Or Foundation 2024)', href: '#' }, // TODO
      { label: 'Lookbook', href: '#' }, // TODO
    ],
  },
  {
    label: 'OWO School',
    href: '#', // TODO: client to supply destination
    children: [
      { label: 'Curriculum (Vital Materialism)', href: '#' }, // TODO
      { label: 'Case Study', href: '#' }, // TODO
      // Client wrote "Loobook"; corrected to "Lookbook" — see FLAGS.
      { label: 'Lookbook', href: '#' }, // TODO
      { label: 'OWO Festival Exhibition 2025', href: '#' }, // TODO
    ],
  },
]
