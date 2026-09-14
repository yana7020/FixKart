import { useEffect, useState } from "react"

function Messages() {
  const [bookings, setBookings] = useState([])
  const [selectedBooking, setSelectedBooking] = useState(null)
  const [messages, setMessages] = useState([])
  const [message, setMessage] = useState("")

  const loadBookings = () => {
    const savedBookings =
      JSON.parse(localStorage.getItem("fixkartBookings")) || []

    const activeBookings = savedBookings.filter(
      (booking) =>
        booking.status === "Accepted" &&
        booking.serviceStatus !== "Completed"
    )

    setBookings(activeBookings)

    if (selectedBooking) {
      const updatedBooking = activeBookings.find(
        (booking) => booking.id === selectedBooking.id
      )

      if (updatedBooking) {
        setSelectedBooking(updatedBooking)
      } else {
        setSelectedBooking(null)
        setMessages([])
      }
    }
  }

  const loadMessages = () => {
    if (!selectedBooking) {
      return
    }

    const savedMessages =
      JSON.parse(
        localStorage.getItem(
          `fixkartChat_${selectedBooking.id}`
        )
      ) || []

    setMessages(savedMessages)
  }

  useEffect(() => {
    loadBookings()

    window.addEventListener("storage", loadBookings)

    return () => {
      window.removeEventListener("storage", loadBookings)
    }
  }, [selectedBooking])

  useEffect(() => {
    if (!selectedBooking) {
      return
    }

    loadMessages()

    window.addEventListener("storage", loadMessages)

    return () => {
      window.removeEventListener("storage", loadMessages)
    }
  }, [selectedBooking])

  const openChat = (booking) => {
    setSelectedBooking(booking)
  }

  const sendMessage = () => {
    if (!selectedBooking || !message.trim()) {
      return
    }

    const newMessage = {
      id: Date.now(),
      sender: "customer",
      text: message.trim(),
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    }

    const updatedMessages = [...messages, newMessage]

    localStorage.setItem(
      `fixkartChat_${selectedBooking.id}`,
      JSON.stringify(updatedMessages)
    )

    setMessages(updatedMessages)
    setMessage("")

    window.dispatchEvent(new Event("storage"))
  }

  if (selectedBooking) {
    return (
      <div className="min-h-screen bg-slate-50 p-6 md:p-8 lg:p-10">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => setSelectedBooking(null)}
            className="mb-6 text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            ← Back to Messages
          </button>

          <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-200">
              <h1 className="text-xl font-semibold text-slate-900">
                {selectedBooking.provider ||
                  "Rajesh Kumar"}
              </h1>

              <p className="text-sm text-blue-600 mt-1">
                {selectedBooking.service?.name}
              </p>

              <p className="text-xs text-slate-500 mt-1">
                Booking ID: {selectedBooking.id}
              </p>
            </div>

            <div className="h-[450px] overflow-y-auto p-5 bg-slate-50 space-y-4">
              {messages.length === 0 ? (
                <div className="h-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl mb-3">
                      💬
                    </div>

                    <p className="font-medium text-slate-700">
                      Start the conversation
                    </p>

                    <p className="text-sm text-slate-500 mt-1">
                      Send a message to your service provider.
                    </p>
                  </div>
                </div>
              ) : (
                messages.map((item) => (
                  <div
                    key={item.id}
                    className={`flex ${
                      item.sender === "customer"
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[80%] px-4 py-3 rounded-xl ${
                        item.sender === "customer"
                          ? "bg-blue-600 text-white"
                          : "bg-white border border-slate-200 text-slate-800"
                      }`}
                    >
                      <p className="text-sm">
                        {item.text}
                      </p>

                      <p
                        className={`text-[11px] mt-1 ${
                          item.sender === "customer"
                            ? "text-blue-100"
                            : "text-slate-400"
                        }`}
                      >
                        {item.time}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="p-4 border-t border-slate-200">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={message}
                  onChange={(event) =>
                    setMessage(event.target.value)
                  }
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      sendMessage()
                    }
                  }}
                  placeholder="Type a message..."
                  className="flex-1 px-4 py-3 border border-slate-300 rounded-lg outline-none focus:border-blue-500"
                />

                <button
                  onClick={sendMessage}
                  className="px-5 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

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

        {bookings.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-xl p-10 text-center shadow-sm">
            <div className="text-4xl mb-4">
              💬
            </div>

            <h2 className="text-xl font-semibold text-slate-900">
              No Active Conversations
            </h2>

            <p className="text-slate-500 mt-2">
              Chat will become available when a provider
              accepts your booking.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking) => {
              const chatMessages =
                JSON.parse(
                  localStorage.getItem(
                    `fixkartChat_${booking.id}`
                  )
                ) || []

              const lastMessage =
                chatMessages[chatMessages.length - 1]

              return (
                <div
                  key={booking.id}
                  className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center text-xl">
                        {booking.service?.icon}
                      </div>

                      <div>
                        <h2 className="text-lg font-semibold text-slate-900">
                          {booking.provider ||
                            "Rajesh Kumar"}
                        </h2>

                        <p className="text-sm text-blue-600 mt-1">
                          {booking.service?.name}
                        </p>

                        <p className="text-sm text-slate-500 mt-2">
                          {lastMessage
                            ? lastMessage.text
                            : "Start a conversation"}
                        </p>

                        <p className="text-xs text-slate-400 mt-1">
                          Booking ID: {booking.id}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => openChat(booking)}
                      className="px-5 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition"
                    >
                      Open Chat
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default Messages