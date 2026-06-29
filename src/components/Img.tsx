'use client'

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || ''

interface ImgProps {
  src: string
  alt: string
  fill?: boolean
  style?: React.CSSProperties
}

export default function Img({ src, alt, fill, style }: ImgProps) {
  const fullSrc = `${BASE_PATH}${src}`

  if (fill) {
    return (
      <img
        src={fullSrc}
        alt={alt}
        loading="lazy"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          ...style,
        }}
      />
    )
  }

  return <img src={fullSrc} alt={alt} loading="lazy" style={style} />
}
