export const revalidate = 60
import Banner from '@/components/banner'
import BannerBottom from '@/components/bannerbottom'
import Footer from '@/components/footer'
import Header from '@/components/header'
import Image from 'next/image'

import Link from 'next/link'
import { client } from '../../../sanity/lib/client'
import { urlForImage } from '../../../sanity/lib/image'



async function getData() {
  const query  = 
  `*[_type == "post"]{
    _id,
      mainImage,
      title,
      slug,
      author -> {
        name,
        image
      },
      description,
      publishedAt,
  }`
  const posts  = await client.fetch(query,{ cache : "no-store" });
  return posts
}



export default async function Home() {
  const data = await getData()
  console.log(data)
  return (
    <main className="font-bodyFont">
        <div className="max-w-7xl mx-auto h-60 relative">
          <BannerBottom />
        </div>
        {/* ============ Banner-Bottom End here ======= */}
        {/* ============ Post Part Start here ========= */}
        <div className="mt-10 max-w-7xl mx-auto py-6 px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 place-content-center justify-items-center">
          {
            data.map((post, i)=>(
              <Link key={post._id} href={`/post/${post.slug.current}`}>
                <div className='group h-[450px] border rounded-sm border-purple-500 border-opacity-25'>
                  <div className='overflow-hidden h-3/5 w-full '>
                    <Image
                    width={580}
                    height={400}
                    src={urlForImage(post.mainImage)}
                    alt="image"
                    quality={100}
                    className='group-hover:scale-110 transition-transform h-full duration-300 object-cover object-center brightness-75 group-hover:brightness-100'
                    />
                  </div>
                  <div className='h-2/5 w-full flex flex-col justify-center '>
                    <div className='flex justify-between items-center px-4 py-1 border-b border-b-gray-400'>
                      <p className="text-xl uppercase font-bold">{post.title}</p>
                      <img src={urlForImage(post.author.image)} alt="author" className='w-12 h-12 rounded-full object-cover'/>
                    </div>
                    <p className='px-4 py-2 text-base'>
                      {post?.description?.substring(0,59)}... by - {" "}
                      <span className='font-semibold'>{post.author.name}</span>
                    </p>
                  </div>
                </div>
              </Link>
            ))
          }
        </div>
        {/* ============ Post Part End here =========== */}
        {/* ============ Footer Start here============= */}
        <Footer />
        {/* ============ Footer End here ============== */}
      </main>
  )
}
