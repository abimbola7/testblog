import React from 'react'
import { getImageDimensions } from "@sanity/asset-utils"
import { urlForImage } from '../../sanity/lib/image'
import Image from 'next/image'

const ImageComponent = ({ value, isInline }) => {
  const { width, height  } = getImageDimensions(value)

  return (
    <Image
    src={urlForImage(value)} 
    alt={"image"}
    width={700}
    height={500}
    loading='lazy'
    quality={100}
    style={{
      display : isInline ? "inline-block" : "block",
      aspectRatio : width / height
    }}
    />
  )

}

export default ImageComponent