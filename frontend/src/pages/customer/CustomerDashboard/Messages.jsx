function Messages() {
  const conversations = [
    {
      id: 1,
      provider: "Rajesh Kumar",
      service: "Electrician",
      message: "I will reach your location at 10:00 AM.",
      time: "10:15 AM",
    },
    {
      id: 2,
      provider: "Amit Sharma",
      service: "Home Cleaning",
      message: "Your booking has been confirmed.",
      time: "Yesterday",
    },
  ]

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-8 lg:p-10">
      <div className="max-w-6xl mx-auto space-y-8">

        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Messages
          </h1>

          <p className="text-slate-600 mt-2">
            Chat with your service providers.
          </p>
        </div>

        <div className="space-y-4">

          {conversations.map((conversation) => (
            <div
              key={conversation.id}
              className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm"
            >

              <div className="flex items-start justify-between gap-4">

                <div>
                  <h2 className="text-lg font-semibold text-slate-900">
                    {conversation.provider}
                  </h2>

                  <p className="text-sm text-blue-600 mt-1">
                    {conversation.service}
                  </p>

                  <p className="text-sm text-slate-600 mt-3">
                    {conversation.message}
                  </p>
                </div>

                <span className="text-xs text-slate-500 whitespace-nowrap">
                  {conversation.time}
                </span>

              </div>

              <div className="mt-5 pt-5 border-t border-slate-200">

                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition">
                  Open Chat
                </button>

              </div>

            </div>
          ))}

        </div>

      </div>
    </div>
  )
}

export default Messages