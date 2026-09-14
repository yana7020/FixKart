import { BrowserRouter, Routes, Route } from "react-router-dom"

import LandingPage from "./pages/LandingPage/LandingPage"
import RoleSelection from "./pages/RoleSelection/RoleSelection"

import CustomerLogin from "./pages/customer/Authentication/CustomerLogin"
import CustomerSignup from "./pages/customer/Authentication/CustomerSignup"

import CustomerDashboard from "./pages/customer/CustomerDashboard/CustomerDashboard"
import DashboardHome from "./pages/customer/CustomerDashboard/DashboardHome"
import MyBookings from "./pages/customer/CustomerDashboard/MyBookings"
import ActiveBooking from "./pages/customer/CustomerDashboard/ActiveBooking"
import BookingHistory from "./pages/customer/CustomerDashboard/BookingHistory"
import Messages from "./pages/customer/CustomerDashboard/Messages"
import Notifications from "./pages/customer/CustomerDashboard/Notifications"
import Profile from "./pages/customer/CustomerDashboard/Profile"

import ServiceDetails from "./pages/customer/Booking/ServiceDetails"
import Payment from "./pages/customer/Booking/Payment"
import BookingConfirmation from "./pages/customer/Booking/BookingConfirmation"

import ProviderLogin from "./pages/provider/Authentication/ProviderLogin"
import ProviderSignup from "./pages/provider/Authentication/ProviderSignup"

import ProviderDashboard from "./pages/provider/ProviderDashboard/ProviderDashboard"
import ProviderDashboardHome from "./pages/provider/ProviderDashboard/DashboardHome"
import BookingRequests from "./pages/provider/ProviderDashboard/BookingRequests"
import ActiveJob from "./pages/provider/ProviderDashboard/ActiveJob"
import JobHistory from "./pages/provider/ProviderDashboard/JobHistory"
import ProviderMessages from "./pages/provider/ProviderDashboard/Messages"
import ProviderNotifications from "./pages/provider/ProviderDashboard/Notifications"
import ProviderProfile from "./pages/provider/ProviderDashboard/Profile"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route path="/role-selection" element={<RoleSelection />} />

        <Route path="/customer/login" element={<CustomerLogin />} />
        <Route path="/customer/signup" element={<CustomerSignup />} />

        <Route path="/customer/dashboard" element={<CustomerDashboard />}>
          <Route index element={<DashboardHome />} />
          <Route path="bookings" element={<MyBookings />} />
          <Route path="active-booking" element={<ActiveBooking />} />
          <Route path="booking-history" element={<BookingHistory />} />
          <Route path="messages" element={<Messages />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="profile" element={<Profile />} />
          <Route path="book-service/details" element={<ServiceDetails />} />
          <Route path="payment" element={<Payment />} />
          <Route
            path="book-service/confirmation"
            element={<BookingConfirmation />}
          />
        </Route>

        <Route path="/provider/login" element={<ProviderLogin />} />
        <Route path="/provider/signup" element={<ProviderSignup />} />

        <Route path="/provider/dashboard" element={<ProviderDashboard />}>
          <Route index element={<ProviderDashboardHome />} />
          <Route path="booking-requests" element={<BookingRequests />} />
          <Route path="active-job" element={<ActiveJob />} />
          <Route path="job-history" element={<JobHistory />} />
          <Route path="messages" element={<ProviderMessages />} />
          <Route path="notifications" element={<ProviderNotifications />} />
          <Route path="profile" element={<ProviderProfile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
