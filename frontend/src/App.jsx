import React from 'react'
import Navbar from './components/Navbar'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Doctors from './pages/Doctors'
import Login from './pages/Login'
import About from './pages/About'
import Contact from './pages/Contact'
import Appointment from './pages/Appointment'
import MyAppointments from './pages/MyAppointments'
import MyProfile from './pages/MyProfile'
import Footer from './components/Footer'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Verify from './pages/Verify'
import AudioRecord from './pages/AudioRecord'
import NewPage from './pages/NewPage'
import Calculator from './pages/Calculator'
import MedicationReminder from './pages/MedicationReminder'
import DailyHealthJournal from './pages/DailyHealthJournal'
import PostureChecker from './pages/PostureChecker'
import SpeechToEnglish from './pages/SpeechToEnglish'
import PrescriptionList from './pages/PrescriptionList'
import FloatingHospitalButton from './components/FloatingHospitalButton' // 👈 NEW
import EmergencyButton from './components/EmergencyButton';

const App = () => {
  return (
    <div className='mx-4 sm:mx-[10%]'>
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/doctors' element={<Doctors />} />
        <Route path='/doctors/:speciality' element={<Doctors />} />
        <Route path='/login' element={<Login />} />
        
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/audio' element={<AudioRecord />} />
        <Route path='/new' element={<NewPage />} />
        <Route path='/calculator' element={<Calculator />} />
        <Route path='/med-reminder' element={<MedicationReminder />} />
        <Route path='/health-journal' element={<DailyHealthJournal />} />
        <Route path='/posture-checker' element={<PostureChecker />} />
        <Route path='/speech-english' element={<SpeechToEnglish />} />
        <Route path='/prescription-list' element={<PrescriptionList />} />
        <Route path='/appointment/:docId' element={<Appointment />} />
        <Route path='/my-appointments' element={<MyAppointments />} />
        <Route path='/my-profile' element={<MyProfile />} />
        <Route path='/verify' element={<Verify />} />
      </Routes>
      <Footer />
      <FloatingHospitalButton /> {/* 👈 Always visible floating button */}
      <EmergencyButton />
    </div>
  )
}

export default App