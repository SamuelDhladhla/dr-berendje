/*
  Site-wide identity and contact details.

  The footer reads entirely from here, so the client can revise wording without
  anyone touching component markup. She has not finalised this content — treat
  every value below as provisional.
*/

export const INSTAGRAM_URL = 'https://www.instagram.com/drberendje'

export const SITE_INFO = {
  /** The wordmark is a separate component; this is the full legal name. */
  fullName: 'Berendje Willemina Valkeman',
  email: 'linda@drberendje.com',
  instagram: { handle: '@drberendje', url: INSTAGRAM_URL },
  affiliation: 'PhD Design Research · ArtEZ University of the Arts',
  rights: `© ${new Date().getFullYear()} All rights reserved`,
}
