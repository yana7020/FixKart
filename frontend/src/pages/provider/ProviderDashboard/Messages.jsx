function Messages() {
  const conversations = [
    {
      name: "Amit Verma",
      message: "I have shared my location.",
      time: "10:42 AM",
    },
    {
      name: "Rahul Sharma",
      message: "What time will you arrive?",
      time: "Yesterday",
    },
    {
      name: "Priya Singh",
      message: "Thank you for the service.",
      time: "Yesterday",
    },
  ]

  return (
    <div className="p-6 md:p-8 lg:p-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">
          Messages
        </h1>

        <p className="text-slate-600 mt-2">
          Chat with your customers.
        </p>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        {conversations.map((conversation, index) => (
          <div
            key={conversation.name}
            className={`p-5 flex items-center gap-4 ${
              index !== conversations.length - 1
                ? "border-b border-slate-200"
                : ""
            }`}
          >
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center font-semibold">
              {conversation.name.charAt(0)}
            </div>

            <div className="flex-1 min-w-0">
              <h2 className="font-semibold text-slate-900">
                {conversation.name}
              </h2>

              <p className="text-sm text-slate-500 truncate mt-1">
                {conversation.message}
              </p>
            </div>

            <p className="text-xs text-slate-400">
              {conversation.time}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Messages