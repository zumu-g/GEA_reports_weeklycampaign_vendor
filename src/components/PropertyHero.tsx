import Image from "next/image";

interface PropertyHeroProps {
  imageUrl?: string;
  address: string;
}

export default function PropertyHero({ imageUrl, address }: PropertyHeroProps) {
  if (!imageUrl) return null;

  return (
    <div className="relative w-full h-48 md:h-64 rounded-2xl overflow-hidden mb-6">
      <Image
        src={imageUrl}
        alt={address}
        fill
        className="object-cover"
        priority
        sizes="(max-width: 768px) 100vw, 896px"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
    </div>
  );
}
