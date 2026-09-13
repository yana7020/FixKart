const services = [
  {
    name: "Electrician",
    description: "Electrical repair and installation services."
  },
  {
    name: "Plumbing",
    description: "Professional plumbing and repair services."
  },
  {
    name: "Home Appliance Repair",
    description: "Repair services for your home appliances."
  },
  {
    name: "Home Cleaning",
    description: "Reliable cleaning services for your home."
  },
  {
    name: "Cook",
    description: "Professional cooking services for your home."
  }
]

function Services() {
  return (
    <section className="px-8 py-16">
      <h2 className="text-3xl font-bold text-center mb-10">
        Our Services
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {services.map((service) => (
        <div className="p-6 shadow-md rounded-lg" key={service.name}>
            <h3 className="text-xl font-bold">
            {service.name}
            </h3>

            <p>{service.description}</p>
        </div>
        ))}
      </div>
    </section>
  )
}

export default Services