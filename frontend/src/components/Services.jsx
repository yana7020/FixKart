function Services() {
  return (
    <section className="px-8 py-16">
      <h2 className="text-3xl font-bold text-center mb-10">
        Our Services
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 shadow-md rounded-lg">
          <h3 className="text-xl font-bold">Electrician</h3>
          <p>Electrical repair and installation services.</p>
        </div>

        <div className="p-6 shadow-md rounded-lg">
          <h3 className="text-xl font-bold">Plumbing</h3>
          <p>Professional plumbing and repair services.</p>
        </div>

        <div className="p-6 shadow-md rounded-lg">
          <h3 className="text-xl font-bold">Home Appliance Repair</h3>
          <p>Repair services for your home appliances.</p>
        </div>

        <div className="p-6 shadow-md rounded-lg">
          <h3 className="text-xl font-bold">Home Cleaning</h3>
          <p>Reliable cleaning services for your home.</p>
        </div>

        <div className="p-6 shadow-md rounded-lg">
          <h3 className="text-xl font-bold">Cook</h3>
          <p>Professional cooking services for your home.</p>
        </div>
      </div>
    </section>
  )
}

export default Services