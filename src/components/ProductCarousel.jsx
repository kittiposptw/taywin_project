import { useState } from 'react'
import { Link } from 'react-router-dom'
import { resolveImageUrl } from '../config/images'

export default function ProductCarousel({ products }) {
  const [paused, setPaused] = useState(false)
  const doubled = [...products, ...products]
  const duration = `${Math.max(products.length, 1) * 6}s`

  return (
    <div className="overflow-hidden w-full">
      <div
        className="flex gap-6"
        style={{
          animation: `marquee ${duration} linear infinite`,
          animationPlayState: paused ? 'paused' : 'running',
          width: 'max-content',
        }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {doubled.map((item, i) => (
          <Link
            key={`${item.sku}-${i}`}
            to={`/product/${item.sku}`}
            className="group shrink-0 w-[240px]"
          >
            <div className="aspect-[4/5] bg-[#f2f2f2] overflow-hidden mb-4">
              <img
                src={resolveImageUrl(item.imageUrl)}
                alt={item.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <h3 className="font-['Hanken_Grotesk'] text-sm font-medium text-[#1a1c1c] group-hover:opacity-60 transition-opacity">
              {item.name}
            </h3>
            <p className="font-['Hanken_Grotesk'] text-xs text-[#7e7576] mt-0.5">
              {item.series} · {item.price.toLocaleString()} THB
            </p>
          </Link>
        ))}
      </div>
    </div>
  )
}
