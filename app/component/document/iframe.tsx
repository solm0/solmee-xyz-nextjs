export default function Iframe({
  src,
}: {
  src: string
}) {
  return (
    <iframe
      src={src}
      className="w-full md:w-[calc(100vw-26rem)] h-auto aspect-16/9 py-4"
      title="YouTube video player"
      allow="accelerometer;
      autoplay; clipboard-write;
      encrypted-media;
      gyroscope; picture-in-picture; web-share"
      referrerPolicy="strict-origin-when-cross-origin"
      allowFullScreen
    />
  )
}