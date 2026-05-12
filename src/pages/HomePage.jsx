import { Link } from 'react-router-dom'
import NavBar from '../components/NavBar'

export default function HomePage() {
  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <img
        src="/hero-cobbler.png"
        alt=""
        className="absolute inset-0 w-full h-full object-contain bg-[#e8ddd0]"
      />
      <Link
        to="/collections"
        className="absolute inset-0 z-10 cursor-pointer"
        aria-label="Shop All"
      />
      <NavBar transparent />
    </div>
  )
}
