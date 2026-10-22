/*
  Consultancy — nested hierarchy as the client listed it.

  No destinations were supplied for any item, so every href is "#" + TODO.

  The page layout was extrapolated from Education: the client has given no
  reference for this section. See FLAGS.
*/

import type { EducationItem } from './education'

/** Same shape as Education: a label, an href, and optional nested children. */
export type ConsultancyItem = EducationItem

export const CONSULTANCY_ITEMS: ConsultancyItem[] = [
  {
    label: 'Cross Cultural Consultancy',
    href: '#', // TODO: client to supply destination
    children: [
      {
        label: 'Julius Holland, Victoire',
        href: '#', // TODO
        children: [
          { label: 'Brand Identity & Strategy for a luxury African wax print', href: '#' }, // TODO
          { label: 'Speculative Futures', href: '#' }, // TODO
          { label: 'Slay Mama', href: '#' }, // TODO
          { label: 'Dutch Embassy Mapping', href: '#' }, // TODO
        ],
      },
      {
        label: 'Julius Holland: Speculative Futures (video LABOOMZ)',
        href: '#', // TODO
        children: [
          { label: 'The Style Hack', href: '#' }, // TODO
          {
            label: '(Cross Cultural) Productions',
            href: '#', // TODO
            children: [
              { label: 'Lagos: Slay Mamma / Yoye / Every Day Lagos is Couture (Series of Interviews)', href: '#' }, // TODO
              { label: 'Kano: Victoire Magic x Wamball / Julius / Ali Jita', href: '#' }, // TODO
              { label: 'Abuja: Soul in Motion', href: '#' }, // TODO
              { label: 'Accra: Victoire Magic Princess / Soul in Motion', href: '#' }, // TODO
            ],
          },
        ],
      },
    ],
  },
]
