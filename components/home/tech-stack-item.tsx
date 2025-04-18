"use client"

import Image from "next/image"

interface TechStackItemProps {
  name: string
  icon: string
  index?: number
}

export function TechStackItem({ name, icon }: TechStackItemProps) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="p-4 rounded-xl bg-background dark:bg-muted border shadow-sm">
        <div className="relative w-12 h-12">
          <Image
            src={icon || "/placeholder.svg"}
            alt={name}
            fill
            sizes="48px"
            className="object-contain drop-shadow-sm"
            unoptimized
          />
        </div>
      </div>
      <span className="text-sm font-medium opacity-70">
        {name}
      </span>
    </div>
  )
}