import { useNavigate } from "react-router-dom"
import heroImage from "../../assets/hero.jpg"

function Hero() {
  const navigate = useNavigate()

  return (
    <section className="bg-white px-6 py-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-10">

        <div>

          <p className="text-blue-600 font-semibold mb-4">
            YOUR HOME. OUR RESPONSIBILITY.
          </p>

          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 leading-tight mb-6">
            Reliable Home Services,
            <br />
            <span className="text-blue-600">
              One Tap Away
            </span>
          </h1>

          <p className="text-lg text-slate-600 max-w-xl mb-8">
            Book trusted professionals for all your home needs.
            Fast. Reliable. Affordable.
          </p>

          <button
            onClick={() => navigate("/role-selection")}
            className="px-7 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
          >
            Book a Service Now
          </button>

        </div>

        <div className="flex justify-center">

          <img
            src={heroImage}
            alt="FixKart home service professionals"
            className="w-full max-w-lg object-contain"
          />

        </div>

      </div>
    </section>
  )
}

export default Hero