function Footer() {
  return (
    <footer className="bg-slate-900 text-white px-6 py-12">

      <div className="max-w-6xl mx-auto">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          <div>

            <h2 className="text-2xl font-bold text-blue-500 mb-3">
              FixKart
            </h2>

            <p className="text-slate-400 max-w-xs">
              Reliable home services connecting you with
              trusted professionals at your doorstep.
            </p>

          </div>


          <div>

            <h3 className="font-bold mb-4">
              Quick Links
            </h3>

            <div className="flex flex-col gap-2 text-slate-400">

              <a
                href="#"
                className="hover:text-blue-400 transition"
              >
                Home
              </a>

              <a
                href="#services"
                className="hover:text-blue-400 transition"
              >
                Services
              </a>

              <a
                href="#how-it-works"
                className="hover:text-blue-400 transition"
              >
                How It Works
              </a>

              <a
                href="#"
                className="hover:text-blue-400 transition"
              >
                Contact
              </a>

            </div>

          </div>


          <div>

            <h3 className="font-bold mb-4">
              Our Services
            </h3>

            <div className="flex flex-col gap-2 text-slate-400">

              <p>Electrician</p>
              <p>Plumbing</p>
              <p>Home Cleaning</p>
              <p>Appliance Repair</p>
              <p>Cooking Services</p>

            </div>

          </div>

        </div>


        <div className="border-t border-slate-700 mt-10 pt-6 text-center text-slate-400">

          <p>
            © 2026 FixKart. All rights reserved.
          </p>

        </div>

      </div>

    </footer>
  )
}

export default Footer