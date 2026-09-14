import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

function ServiceSetup() {
  const navigate = useNavigate()

  const services = [
    "Electrician",
    "Plumbing",
    "Home Appliance Repair",
    "Home Cleaning",
    "Cook",
  ]

  const [selectedServices, setSelectedServices] = useState([])

  useEffect(() => {
    const savedServices =
      JSON.parse(localStorage.getItem("fixkartProviderServices")) || []

    setSelectedServices(savedServices)
  }, [])

  const toggleService = (service) => {
    setSelectedServices((currentServices) =>
      currentServices.includes(service)
        ? currentServices.filter((item) => item !== service)
        : [...currentServices, service]
    )
  }

  const handleContinue = () => {
    localStorage.setItem(
      "fixkartProviderServices",
      JSON.stringify(selectedServices)
    )

    window.dispatchEvent(new Event("fixkartProviderServicesUpdated"))

    navigate("/provider/dashboard")
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6 py-10">
      <div className="w-full max-w-2xl bg-white rounded-xl border border-slate-200 shadow-sm p-8">
        <h1 className="text-3xl font-bold text-slate-900">
          Set Up Your Services
        </h1>

        <p className="text-slate-600 mt-2 mb-8">
          Select the services you provide through FixKart.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {services.map((service) => {
            const isSelected = selectedServices.includes(service)

            return (
              <button
                key={service}
                type="button"
                onClick={() => toggleService(service)}
                className={`text-left p-5 border rounded-xl transition ${
                  isSelected
                    ? "border-blue-500 bg-blue-50"
                    : "border-slate-200 hover:border-blue-500 hover:bg-blue-50"
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <h2 className="font-semibold text-slate-900">
                    {service}
                  </h2>

                  <div
                    className={`w-5 h-5 rounded-md border flex items-center justify-center ${
                      isSelected
                        ? "bg-blue-600 border-blue-600"
                        : "border-slate-300"
                    }`}
                  >
                    {isSelected && (
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="white"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="m5 12 4 4L19 6" />
                      </svg>
                    )}
                  </div>
                </div>

                <p className="text-sm text-slate-500 mt-1">
                  I provide this service
                </p>
              </button>
            )
          })}
        </div>

        <button
          type="button"
          onClick={handleContinue}
          disabled={selectedServices.length === 0}
          className="w-full mt-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition disabled:bg-slate-300 disabled:cursor-not-allowed"
        >
          Continue
        </button>
      </div>
    </div>
  )
}

export default ServiceSetup