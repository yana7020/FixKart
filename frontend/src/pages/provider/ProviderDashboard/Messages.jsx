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
      sender: "provider",
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
      <div className="p-6 md:p-8 lg:p-10">
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
                {selectedBooking.customer}
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
                      Send a message to your customer.
                    </p>
                  </div>
                </div>
              ) : (
                messages.map((item) => (
                  <div
                    key={item.id}
                    className={`flex ${
                      item.sender === "provider"
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[80%] px-4 py-3 rounded-xl ${
                        item.sender === "provider"
                          ? "bg-blue-600 text-white"
                          : "bg-white border border-slate-200 text-slate-800"
                      }`}
                    >
                      <p className="text-sm">
                        {item.text}
                      </p>

                      <p
                        className={`text-[11px] mt-1 ${
                          item.sender === "provider"
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
    <div className="p-6 md:p-8 lg:p-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">
          Messages
        </h1>

        <p className="text-slate-600 mt-2">
          Chat with your customers.
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
            Chat will become available when you accept a
            booking.
          </p>
        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
          {bookings.map((booking, index) => {
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
                className={`p-5 flex flex-col sm:flex-row sm:items-center gap-4 ${
                  index !== bookings.length - 1
                    ? "border-b border-slate-200"
                    : ""
                }`}
              >
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center font-semibold shrink-0">
                  {booking.customer?.charAt(0)}
                </div>

                <div className="flex-1 min-w-0">
                  <h2 className="font-semibold text-slate-900">
                    {booking.customer}
                  </h2>

                  <p className="text-sm text-blue-600 mt-1">
                    {booking.service?.name}
                  </p>

                  <p className="text-sm text-slate-500 truncate mt-1">
                    {lastMessage
                      ? lastMessage.text
                      : "Start a conversation"}
                  </p>

                  <p className="text-xs text-slate-400 mt-1">
                    Booking ID: {booking.id}
                  </p>
                </div>

                <button
                  onClick={() => openChat(booking)}
                  className="px-5 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition"
                >
                  Open Chat
                </button>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default Messages