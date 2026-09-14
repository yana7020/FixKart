import { useNavigate } from "react-router-dom"

function CTA() {
  const navigate = useNavigate()

  return (
    <section className="px-6 py-12 bg-[#172554] text-white">
      <div className="max-w-4xl mx-auto text-center">

        <p className="text-blue-200 font-semibold tracking-wide mb-2">
          GET STARTED TODAY
        </p>

        <h2 className="text-3xl md:text-4xl font-bold mb-3">
          Need a Service?
          <span className="block">
            FixKart Has You Covered.
          </span>
        </h2>

        <p className="text-slate-300 max-w-2xl mx-auto mb-5">
          Find trusted professionals and get your home services
          done with ease.
        </p>

        <button
          onClick={() => navigate("/role-selection")}
          className="px-7 py-2.5 bg-white text-[#172554] font-semibold rounded-lg hover:bg-blue-50 transition"
        >
          Get Started
        </button>

      </div>
    </section>
  )
}

export default CTA