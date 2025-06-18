"use client"

import Image from "next/image"
import { ExternalLink } from "lucide-react"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

interface ProjectGalleryProps {
  images: string[]
  projectTitle: string
}

export function ProjectGallery({ images, projectTitle }: ProjectGalleryProps) {
  return (
    <div className="relative">
      <Carousel 
        className="w-full" 
        opts={{
          align: "start",
          loop: true,
          skipSnaps: false,
        }}
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {images.map((image: string, index: number) => (
            <CarouselItem key={index} className="pl-2 md:pl-4 basis-full md:basis-1/2 lg:basis-1/3">
              <div className="group relative aspect-video overflow-hidden rounded-2xl border border-border shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-background">
                <Image
                  src={image}
                  alt={`${projectTitle} screenshot ${index + 1}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">Screenshot {index + 1}</p>
                    <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <ExternalLink className="h-4 w-4" />
                    </div>
                  </div>
                </div>
                <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {index + 1} / {images.length}
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-2 md:left-4 bg-background/80 backdrop-blur-sm border-border hover:bg-background" />
        <CarouselNext className="right-2 md:right-4 bg-background/80 backdrop-blur-sm border-border hover:bg-background" />
      </Carousel>
      
      {/* Gallery Navigation Dots */}
      <div className="flex justify-center mt-6 space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            className="w-2 h-2 rounded-full bg-muted-foreground/30 hover:bg-muted-foreground/60 transition-colors duration-200"
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
} 