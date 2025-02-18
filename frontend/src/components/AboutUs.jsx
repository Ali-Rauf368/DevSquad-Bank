import React, { useState } from "react";
import axios from "axios";
import './AboutUs.css'
import Footer from './Footer'; 


const AboutUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    type: "suggestion",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Prepare the FormData from the form
      const form = new FormData(e.target);
      
      // First, send data to the local server
      const localResponse = await axios.post("http://localhost:5000/api/aboutus/submit-feedback", formData);
      console.log("Form submitted to local server:", localResponse.data);

      // Now, send data to Web3Forms
      form.append("access_key", "70152639-d1d2-465e-a046-cd7c3c75f302");

      const object = Object.fromEntries(form);
      const json = JSON.stringify(object);

      const web3Response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: json,
      }).then((res) => res.json());

      if (web3Response.success) {
        console.log("Form submitted to Web3Forms:", web3Response);
      }

      // After both submissions, reset the form and update state
      setFormSubmitted(true);
      setFormData({
        name: "",
        email: "",
        message: "",
        type: "suggestion",
      });

    } catch (err) {
      console.error("Error submitting feedback:", err);
      setError("An error occurred while submitting your feedback. Please try again later.");
    }
  };

  return (
    <div className="about-container">
      {/* About Us Content */}
      <section className="about-section">
        <h1>Welcome to DevSquad Bank</h1>
        <p>
          At <strong>DevSquad Bank</strong>, we are committed to delivering innovative, secure,
          and customer-focused financial solutions. Our goal is to redefine the banking experience
          by integrating advanced technology and unparalleled customer service.
        </p>
      </section>

      {/* Feedback Form */}
      <section className="form-section">
        <h2>We Value Your Feedback</h2>
        {formSubmitted ? (
          <p className="success-message">Thank you for your feedback! We appreciate your time.</p>
        ) : (
          <form onSubmit={handleSubmit} className="feedback-form">
            {error && <p className="error-message">{error}</p>}
            <div className="form-group">
              <label htmlFor="name">Your Name</label>
              <input
                type="text"
                id="name"
                name="name"
                autoComplete="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Your Email</label>
              <input
                type="email"
                id="email"
                name="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email address"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="type">Feedback Type</label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
              >
                <option value="suggestion">Suggestion</option>
                <option value="complaint">Complaint</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="5"
                placeholder="Write your message here..."
                required
              ></textarea>
            </div>
            <button type="submit" className="submit-btn">
              Submit Feedback
            </button>
          </form>
        )}
      </section>
 

       <Footer />
      <div className="back-to-top">
        <a href="#top">⬆ Back to Top</a>
      </div>
      
     
    </div>
  );
};

export default AboutUs;
