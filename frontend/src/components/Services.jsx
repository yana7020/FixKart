const services = [
  {
    name: "Electrician",
    description: "Electrical repair and installation services.",
    icon: "⚡",
  },
  {
    name: "Plumbing",
    description: "Professional plumbing and repair services.",
    icon: "🔧",
  },
  {
    name: "Home Appliance Repair",
    description: "Repair services for your home appliances.",
    icon: "🔌",
  },
  {
    name: "Home Cleaning",
    description: "Reliable cleaning services for your home.",
    icon: "✨",
  },
  {
    name: "Cook",
    description: "Professional cooking services for your home.",
    icon: "🍳",
  },
]

function Services() {
  return (
    <section
      id="services"
      className="px-6 py-20 bg-white"
    >
      <div className="max-w-6xl mx-auto">

        <div className="text-center mb-12">

          <p className="text-blue-600 font-semibold tracking-wide mb-2">
            WHAT WE OFFER
          </p>

          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Our Services
          </h2>

          <p className="text-slate-600 max-w-2xl mx-auto">
            From quick repairs to everyday household needs,
            find trusted professionals for every service.
          </p>

        </div>


        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {services.map((service) => (
            <div
              key={service.name}
              className="p-7 bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition"
            >

              <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center text-2xl mb-6">
                {service.icon}
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-3">
                {service.name}
              </h3>

              <p className="text-slate-600 mb-6">
                {service.description}
              </p>

              <button className="text-blue-600 font-semibold hover:text-blue-700 transition">
                Explore Service →
              </button>

            </div>
          ))}

        </div>

      </div>
    </section>
  )
}

export default Services