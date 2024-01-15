export const revalidate = 60
import React from 'react'
import { client } from '../../../../../sanity/lib/client'
import Image from 'next/image'
import { urlForImage } from '../../../../../sanity/lib/image'
// import PortableText from 'react-portable-text'
import { PortableText } from '@portabletext/react'
import ImageComponent from '@/components/imagecomponent'
import CommentForm from '@/components/commentform'
import Comments from '@/components/comments'

const getSinglePost = async (slug) => {
  const query = 
  `*[_type == "post" && slug.current == "${slug}"]{
    _id,
      mainImage,
      title,
      slug,
      author -> {
        name,
        image
      },
      description,
      body,
      publishedAt,
      "comments" : *[_type == "comment" && post._ref == ^._id && approved == true],
  }[0]`
  const post  = await client.fetch(query)
  return post
}



const Post = async ({ searchParams, params }) => {
  
  const data  = await getSinglePost(params.slug)
  const components = {
    types : {
      image : ImageComponent
    }
  }

  console.log(data, "DATAAAAAA")
  return (
    <div>
      <Image
      src={urlForImage(data.mainImage)}
      alt="image"
      width={1080}
      height={200} 
      priority
      quality={100}
      className='object-cover object-center w-full h-96'
      />
      <div className='max-w-5xl mx-auto'>
        <article className='w-full p-5 bg-stone-800/20'>
          <h1 className='mt-10 mb-3 text-4xl font-medium border-b border-b-cyan-800'>{data.title}</h1>
          <h2 className='mb-2 text-2xl text-gray-500'>{data.description}</h2>
          <div className='flex flex-row items-center w-full space-x-3'>
            <img src={urlForImage(data.author.image)} className='object-cover w-12 h-12 bg-red-500 rounded-full'/>
            <p className='text-base'>
              Blog post by {" "}
              <span className="font-bold text-purple-600">
                {data.author.name}
              </span>
              - Published at { new Date(data.publishedAt).toLocaleDateString() } 
            </p>
          </div>
          <div className="mx-auto mt-10 prose prose-lg md:prose-xl prose-a:text-blue-500">
            {/* <PortableText 
            dataset={process.env.NEXT_PUBLIC_SANITY_DATASET || "production"} 
            projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
            content={data.body}
            // serializers
            /> */}
            <PortableText value={data.body} components={components}/>
          </div>
        </article>
        <hr className='max-w-lg my-5 mx-auto border-[1px] border-gray-500'/>
        <div className='mx-auto text-center'>
          <p className='text-xs font-bold text-gray-400 uppercase'>Enjoyed this article?</p>
          <h3 className="text-3xl font-bold ">Leave a comment below!</h3>
          <CommentForm id={data._id}/>
          <Comments comments={data.comments}/>
        </div>
      </div>
    </div>
  )
}

export default Post