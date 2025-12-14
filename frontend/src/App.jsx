import React from 'react'

import Home from "./pages/Home"
import Login from './pages/Auth/Login'
import Signup from './pages/Auth/Signup'
import Dashboard from './pages/Admin/Dashboard'
import AdminAdoption from './pages/Admin/AdminAdoption'
import AdminRescue from './pages/Admin/AdminRescue'
import AdminDonation from './pages/Admin/AdminDonation'
import AdminVolunteer from "./pages/Admin/AdminVolunteer"
import Adoption from "./pages/Adoption"
import AdoptionPage from "./pages/AdoptionPage"
import Volunteer from "./pages/Volunteer"
import VolunteerPage from './pages/VolunteerPage'
import Donation from "./pages/Donation"
import DonationPage from "./pages/DonationPage"
import Rescue from "./pages/Rescue"
import RescuePage from "./pages/RescuePage"
import ProtectedRoute from './component/ProtectedRoute'
import About from './pages/About'
import Blog from './pages/Resources/Blog'
import Event from './pages/Resources/Event'
import FAQ from './pages/Resources/FAQ'
import PetCare from './pages/Resources/PetCare'
import SuccessStories from './pages/Resources/SuccessStories'
import Contact from './pages/Contact'
import { Routes, Route } from 'react-router-dom'

const App = () => {
  return (
    
      <Routes>
       <Route path="/" element={<Home />} />
       <Route path='/login' element={<Login/>}/>
       <Route path='/signup' element={<Signup/>}/>
       <Route path='/logout' element={<Login/>}/>
       <Route path="/adopt" element={<Adoption />} />
       <Route path='/blog' element={<Blog/>}/>
       <Route path='/events' element={<Event/>}/>
       <Route path='/faq' element={<FAQ/>}/>
       <Route path='/care-guide' element={<PetCare/>}/>
       <Route path='/success-stories' element={<SuccessStories/>}/>
       <Route path='/contact' element={<Contact/>}/>
        <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute allowedRoles={['admin', 'volunteer']}>
            <Dashboard/>
          </ProtectedRoute>
        }
      />
       <Route path='/admin-volunteer' element={
        <ProtectedRoute allowedRoles={['admin', 'volunteer']}>
          <AdminVolunteer/>
        </ProtectedRoute>
       }/>
       <Route path='admin-adoption' element={
        <ProtectedRoute allowedRoles={['admin', 'volunteer']}>
          <AdminAdoption/>
        </ProtectedRoute>
       }/>
       <Route path='admin-rescue' element={
        <ProtectedRoute allowedRoles={['admin', 'volunteer']}>
          <AdminRescue/>
        </ProtectedRoute>
       }/>
       <Route path='admin-donation' element={
        <ProtectedRoute allowedRoles={['admin']}>
          <AdminDonation/>
        </ProtectedRoute>
       }/>
       <Route path="/adoptionPage" element={<AdoptionPage />} />
       <Route path="/volunteer" element={<Volunteer />} />
       <Route path='/volunteerPage' element={<VolunteerPage/>}/>
       <Route path="/donate" element={<Donation />} />
       <Route path="/donationPage" element={<DonationPage />} />
       <Route path="/rescue" element={<Rescue />} />
       <Route path="/rescuePage" element={<RescuePage />} />
       <Route path='/about' element={<About/>}/>
      </Routes>
      
    
  )
}

export default App