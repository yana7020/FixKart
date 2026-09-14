function ServiceSetup() {
  const services = [
    "Electrician",
    "Plumbing",
    "Home Appliance Repair",
    "Home Cleaning",
    "Cook",
  ]

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
          {services.map((service) => (
            <button
              key={service}
              className="text-left p-5 border border-slate-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition"
            >
              <h2 className="font-semibold text-slate-900">
                {service}
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                I provide this service
              </p>
            </button>
          ))}
        </div>

        <button className="w-full mt-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition">
          Continue
        </button>
      </div>
    </div>
  )
}

export default ServiceSetup