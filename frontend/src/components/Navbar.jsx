import { useNavigate } from "react-router-dom"

function Navbar() {
  const navigate = useNavigate()

  return (
    <nav className="bg-white border-b border-slate-200 px-8 py-5">
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        <h1 className="text-2xl font-bold text-blue-600">
          FixKart
        </h1>

        <div className="hidden md:flex items-center gap-8">

          <a
            href="#"
            className="text-slate-700 hover:text-blue-600 transition"
          >
            Home
          </a>

          <a
            href="#services"
            className="text-slate-700 hover:text-blue-600 transition"
          >
            Services
          </a>

          <a
            href="#how-it-works"
            className="text-slate-700 hover:text-blue-600 transition"
          >
            How It Works
          </a>

          <a
            href="#"
            className="text-slate-700 hover:text-blue-600 transition"
          >
            About Us
          </a>

          <a
            href="#"
            className="text-slate-700 hover:text-blue-600 transition"
          >
            Contact
          </a>

          <button
            onClick={() => navigate("/role-selection")}
            className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
          >
            Login / Sign Up
          </button>

        </div>

      </div>
    </nav>
  )
}

export default Navbar