import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Componets/Home';
import About from './Componets/About';
import Contact from './Componets/Contact';
import Donation from './Componets/Donation';
import Signup from './Componets/Signup';
import Signin from './Componets/Signin';
import Sidebar from "./Admin/Sidebar";
import Event from "./Componets/Event";
import Profile from "./user/Profile";
import History from "./user/history";
import Card from "./user/Card";
import Shop from "./Componets/Shop";
import Cart from "./Componets/Cart";
import Timeslot from "./Admin/Timeslot";
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-credit-cards/es/styles-compiled.css";
import 'aos/dist/aos.css';
import 'react-toastify/dist/ReactToastify.css';
import './Componets/donation.css'
import "./Admin/sidebar.css";
import './App.css';
import Admin from "./Admin/Admin";
import ContactData from "./Admin/ContactData";
import Users from "./Admin/Users";
import Producatdetail from "./Componets/Producatdetail";
import Addevents from "./Admin/Addevents";
import ParticipatedEvents from "./user/ParticipatedEvents";
import Myorder from "./Componets/myorder";
import Dashboard from "./Admin/Dashboard";
import Allorder from "./Admin/Allorder";
import ProtectedRoute from "./ProtectedRoute";
import Test from "./Componets/Test";
import { SkeletonTheme } from "react-loading-skeleton";

function App() {
  return (
    <SkeletonTheme>
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/:id" element={<Home />} />

          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/contactdata" element={<ContactData />} />
          <Route path="/users" element={<Users />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/test" element={<Test />} />


          <Route path="/donation/:id" element={<Donation />} />
          <Route path="/donation" element={<Donation />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/sidebar" element={<Sidebar />} />

          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/history/:id" element={<History />} />
          <Route path="/card/:id" element={<Card />} />
          <Route path="/participatedevent/:id" element={<ParticipatedEvents />} />

          <Route path="/shop" element={<Shop />} />
          <Route path="/shop/:id" element={<Shop />} />

          <Route path="/cart" element={<Cart />} />
          <Route path="/cart/:id" element={<Cart />} />


          <Route path="/timeslot" element={<Timeslot />} />
          <Route path="/admin" element={<Admin />} />


          <Route path="/events" element={<Addevents />} />

          <Route path="/event" element={<Event />} />
          <Route path="/event/:id" element={<Event />} />


          <Route path="/myorder" element={<Myorder />} />
          <Route path="/myorder/:id" element={<Myorder />} />

          <Route path="/productdetail" element={<Producatdetail />} />
          <Route path="/productdetail/:id" element={<Producatdetail />} />


          <Route path="/allorder" element={<Allorder />} />

          <Route path="/test" element={<Test />} />


          <Route path="/admin" element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          } />

          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />


          <Route path="/contactdata" element={
            <ProtectedRoute>
              <ContactData />
            </ProtectedRoute>
          } />


          <Route path="/allorder" element={
            <ProtectedRoute>
              <Allorder />
            </ProtectedRoute>
          } />



          <Route path="/timeslot" element={
            <ProtectedRoute>
              <Timeslot />
            </ProtectedRoute>
          } />

          <Route path="/events" element={
            <ProtectedRoute>
              <Addevents />
            </ProtectedRoute>
          } />

          <Route path="/events" element={
            <ProtectedRoute>
              <Addevents />
            </ProtectedRoute>
          } />

          <Route path="/users" element={
            <ProtectedRoute>
              <Users />
            </ProtectedRoute>
          } />

        </Routes>
      </BrowserRouter>
    </SkeletonTheme>
  );
}

export default App;
