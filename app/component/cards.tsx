import { Post } from "@/app/lib/type"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import Image from "next/image"

export function CardSm({posts}: {posts: Post[]}) {
  return (
    <div className="flex gap-2 w-full max-w-[47rem] flex-wrap">
      {posts.map((post) => (
        <Link
        key={post.id}
        href={post.id}
        className={`shrink-0 w-full bg-button-100 h-auto flex items-center rounded-sm p-4 justify-between hover:bg-button-200 hover:translate-x-1 transition-[colors, transform] duration-300`}
        >
          <h3 className="self-end break-keep">{post.title}</h3>
          <ArrowUpRight className="shrink-0 self-start w-5 h-5" />
        </Link>
      ))}
    </div>
  )
}

export function CardMd({posts}: {posts: Post[]}) {
  return (
    <div className="flex gap-2 w-full flex-wrap">
      {posts.map((post) => (
        <Link
          key={post.id}
          href={post.id}
          className={`shrink-0 w-60 h-36 rounded-sm p-4 flex justify-between hover:brightness-95 hover:translate-y-1 transition-[filter, transform] duration-300
            ${post.id === 'cmdc93ok7008imdam853f86o2' || post.id ==='cmdc93fii008hmdam1nvhb1c2' ? 'bg-green-500' : 'bg-button-200' }`}
        >
          <h3 className="self-end break-keep">{post.title}</h3>
          <ArrowUpRight className="shrink-0 self-start w-5 h-5" />
        </Link>
      ))}
    </div>
  )
}

const cloudName = "dpqjfptr6";
const transformations = "f_auto,q_auto";

export function CardLg({posts}: {posts: Post[]}) {
  const generateUrl = (id: string) => {
    const publicId = id;
    return `https://res.cloudinary.com/${cloudName}/image/upload/${transformations}/${publicId}.jpg`;
  }

  return (
    <div className="flex gap-2 w-full flex-wrap">
      {posts.map((post) => (
        <Link
          key={post.id}
          href={post.id}
          className={`relative shrink-0 w-60 h-60 rounded-sm hover:brightness-95 hover:translate-y-1 transition-[filter, transform] duration-300 overflow-clip`}
        >
          {post.thumbnail ?
            <Image
              src={generateUrl(post.thumbnail)}
              width={800}
              height={800}
              className="h-full w-full object-contain rounded-sm cursor-pointer"
              alt={post.id}
            />
            :
            <Image
              src='https://images.unsplash.com/photo-1579546929518-9e396f3cc809'
              width={800}
              height={800}
              className="h-full w-full bg-button-50"
              alt={post.id}
            />
          }
          <div className="absolute bottom-0 left-0 w-full flex bg-button-100 justify-between p-4 text-sm">
            <h3 className="break-keep">{post.title}</h3>
            <ArrowUpRight className="shrink-0 self-start w-5 h-5" />
          </div>
        </Link>
      ))}
    </div>
  )
}

export function CardXl({posts}: {posts: Post[]}) {
  return (
    <div className="flex flex-col gap-4 w-full">
      {posts.map((post) => {
        const images = post.content?.document.filter(cmp => cmp.type === 'component-block' && cmp.component === 'carousel')
        if (!images) return null;

        return (
          <div
            key={post.id}
            className="flex h-[60vh] w-full overflow-scroll cursor-default overscroll-x-none"
          >

            <div className="flex gap-2 ml-72">
              {images.map((img, idx) => {
                return (
                  <div key={idx} className="flex gap-2 w-auto shrink-0">
                    {img.props.items.map((item, idx) => {
                      const publicId = item.imageSrc;
                      const imageUrl = `https://res.cloudinary.com/${cloudName}/image/upload/${transformations}/${publicId}.jpg`;

                      return (
                        <div
                          key={idx}
                          className="relative flex flex-col gap-1 snap-start snap-normal h-full w-auto shrink-0"
                        >
                          <Image
                            src={imageUrl}
                            width={800}
                            height={800}
                            className="h-full w-auto object-contain rounded-sm"
                            alt={item.alt}
                          />
                        </div>
                      )
                    })}
                  </div>
                )
              })}
            </div>

            <Link
              className="absolute flex flex-col w-80 pr-8 h-auto bg-button-100 p-4 mt-2 ml-2 rounded-sm gap-12 shrink-0 cursor-pointer hover:bg-button-200 hover:translate-y-1 transition-[colors, transform] duration-300"
              href={post.id}
            >
              <div className="flex h-8 justify-between ">
                <h3 className="break-keep">{post.title}</h3>
                <ArrowUpRight className="shrink-0 w-5 h-5" />
              </div>
              <div className="w-full text-sm break-keep">{post.excerpt}</div>
            </Link>

          </div>
        )
      })}
    </div>
  )
}