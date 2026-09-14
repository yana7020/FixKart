import { useNavigate } from "react-router-dom"

function RoleSelection() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">
          Welcome to FixKart
        </h1>

        <p className="text-slate-600 mb-8">
          How would you like to continue?
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate("/customer/login")}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            I'm a Customer
          </button>

          <button
            onClick={() => navigate("/provider/login")}
            className="px-6 py-3 bg-slate-900 text-white rounded-lg font-semibold hover:bg-slate-800 transition"
          >
            I'm a Service Provider
          </button>
        </div>
      </div>
    </div>
  )
}

export default RoleSelection