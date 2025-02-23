import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import HomePage from "./components/HomePage";
import ResumeForm from "./components/ResumeForm";
import DigitalProfile4 from "./components/DigitalProfile4";
import ThankYouPage from "./components/ThankYouPage";
import TemplateRender from "./components/TemplateRender";
import LoginPage from "./components/LoginPage";
import ConditionalLayout from "./components/ConditioanlLayout"
import ProtectedRoute from './components/ProtectedRoute'
import { auth } from "./components/firebase";
import { onAuthStateChanged } from "firebase/auth";

const App = () => {
  const [formData, setFormData] = useState(() => {
    const savedData = sessionStorage.getItem("formData");
    return savedData ? JSON.parse(savedData) : {};
  });
  
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigateTo = useNavigate();

  useEffect(() => {
    sessionStorage.setItem("formData", JSON.stringify(formData));
  }, [formData]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <ConditionalLayout>
      <Routes>
        <Route path="/" element={<HomePage dynamicNavigation={navigateTo} />} />
        {!user ? <Route path="/login" element={<LoginPage dynamicNavigation={navigateTo} />} /> : null}
        <Route element={<ProtectedRoute />}>
          <Route path="/form" element={<ResumeForm setFormData={setFormData} formData={formData} dynamicNavigation={navigateTo} />} />
          <Route path="/digital-resume/4" element={<DigitalProfile4 formData={formData} dynamicNavigation={navigateTo} />} />
          <Route path="/digital-resume/:id" element={<TemplateRender formData={formData} dynamicNavigation={navigateTo} />} />
          <Route path="/thank-you" element={<ThankYouPage dynamicNavigation={navigateTo} formData={formData} />} />
        </Route>
      </Routes>
    </ConditionalLayout>
  );
};

export default App;

