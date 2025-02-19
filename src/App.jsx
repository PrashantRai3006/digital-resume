import React, { useState , useEffect} from "react";
import HomePage from "./components/HomePage";
import ResumeForm from "./components/ResumeForm";
import DigitalProfile from "./components/DigitalProfile";
import DigitalProfile2 from "./components/DigitalProfile2";
import DigitalProfile3 from "./components/DigitalProfile3";
import {Routes,Route,useNavigate} from 'react-router-dom'
import ThankYouPage from "./components/ThankYouPage";
const App = () => {
  //const [formData, setFormData] = useState({});
  const [formData, setFormData] = useState(() => {
    // Check sessionStorage for saved data
    const savedData = sessionStorage.getItem("formData");
    return savedData ? JSON.parse(savedData) : { };
  });

  // Save data to sessionStorage whenever formData updates
  useEffect(() => {
    sessionStorage.setItem("formData", JSON.stringify(formData));
  }, [formData]);
  const navigateTo = useNavigate();

  return (
    <>
    <Routes>
      <Route path='/' element={<HomePage dynamicNavigation={navigateTo}/>}/>
      <Route path='/form' element={<ResumeForm setFormData={setFormData} formData={formData} dynamicNavigation={navigateTo}/>}/>
      <Route path='/digital-resume' element={<DigitalProfile2 formData={formData} dynamicNavigation={navigateTo}/>}/>
      <Route path="/thank-you" element={<ThankYouPage dynamicNavigation={navigateTo} formData={formData}/> } />
    </Routes>      
    </>
  );
};

export default App;
