import { Link } from 'react-router-dom'
import NavBar from '../components/NavBar'
import { IMAGES } from '../config/images'

export default function HomePage() {
  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <img
        src={IMAGES.hero}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
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
