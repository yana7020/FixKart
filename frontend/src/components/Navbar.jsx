function Navbar() {
  return (
    <nav className="flex items-center justify-between px-8 py-4 shadow-md">
      <h1 className="text-2xl font-bold">
        FixKart
      </h1>

      <div className="flex gap-6">
        <a href="#">Home</a>
        <a href="#">Services</a>
        <a href="#">Login</a>
      </div>
    </nav>
  )
}

export default Navbar