import { Link } from "react-router-dom"
import { assets } from "../Assets/assets"

const Navbar = () => {
  return (
    <div className="navbar  shadow-sm">
      <div className="flex-1">
        <Link to={'/'}>
        <a className="btn btn-ghost text-xl">
          <img src={assets.logo} alt="" />
        </a>
        </Link>
      </div>
      <div className="flex gap-2">
        <Link to={'/dashboard'}>
        <button className="btn bg-[#5044E5] text-white">
          <img src={assets.arrow} alt="" />
          Login</button>
        </Link>

        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
            <Link to={'/dashboard'}>
            <button className="btn">
              <img className="text-white bg-[#5044E5]" src={assets.arrow} alt="" />
              Logout</button>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Navbar