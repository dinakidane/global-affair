// src/pages/AboutPage.js

import React, { useState, useEffect } from "react";
import { useCurrentUser } from "../../contexts/CurrentUserContext"; // Corrected import path
import axios from "axios";
import styles from "../../styles/AboutPage.module.css";

const AboutPage = () => {
  const currentUser = useCurrentUser();
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ rating: "", text: "" });
  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" });
  const [reviewMessage, setReviewMessage] = useState("");
  const [contactMessage, setContactMessage] = useState("");

  // Fetch reviews from the backend
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get("/reviews/");
        setReviews(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchReviews();
  }, []);

  // Handle review submission
  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/reviews/", newReview);
      setReviewMessage("Thank you! Your review has been posted.");
      setNewReview({ rating: "", text: "" }); // Reset the form after submission
    } catch (err) {
      console.log(err);
    }
  };

  // Handle contact form submission
  const handleContactSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/contact/", contactForm);
      setContactMessage("Your enquiry/complaint has been sent. We'll review it shortly.");
      setContactForm({ name: "", email: "", message: "" }); // Reset the form after submission
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.AboutPage}>
      <div className={styles.MainContent}>
        <h1>About A Global Affair</h1>
        {/* About section */}
        <section className={styles.Section}>
          <p>
            A Global Affair is a platform designed for travel lovers to share their experiences, post pictures of their favorite destinations, and connect with like-minded travelers. Whether you're planning your next adventure or reminiscing about past travels, this is the place to inspire and be inspired!
          </p>
          <p>
            Join our community to discover hidden gems, share travel tips, and connect with fellow adventurers who share your passion for exploration.
          </p>
        </section>

        {/* Submit Review Form - Only for logged in users */}
        {currentUser && (
          <section className={styles.Section}>
            <h2>Submit a Review</h2>
            <form onSubmit={handleReviewSubmit}>
              <label>Rating (1-5):</label>
              <select
                value={newReview.rating}
                onChange={(e) => setNewReview({ ...newReview, rating: e.target.value })}
                required
              >
                <option value="">Select a rating</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
              <label>Review:</label>
              <textarea
                value={newReview.text}
                onChange={(e) => setNewReview({ ...newReview, text: e.target.value })}
                required
              />
              <button type="submit">Post Review</button>
            </form>
            {reviewMessage && <p>{reviewMessage}</p>}
          </section>
        )}

        {/* Contact Form - Only for logged in users */}
        {currentUser && (
          <section className={styles.Section}>
            <h2>Contact Us</h2>
            <form onSubmit={handleContactSubmit}>
              <label>Name:</label>
              <input
                type="text"
                value={contactForm.name}
                onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                required
              />
              <label>Email:</label>
              <input
                type="email"
                value={contactForm.email}
                onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                required
              />
              <label>Message:</label>
              <textarea
                value={contactForm.message}
                onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                required
              />
              <button type="submit">Send Message</button>
            </form>
            {contactMessage && <p>{contactMessage}</p>}
          </section>
        )}

        {!currentUser && (
          <p>
            <strong>Note:</strong> Please <a href="/signin">sign in</a> to submit a review or fill out the contact form.
          </p>
        )}
      </div>

      {/* Sidebar for Reviews */}
      <div className={styles.ReviewSidebar}>
        <h2>User Reviews</h2>
        <div className={styles.Reviews}>
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <div key={review.id} className={styles.Review}>
                <strong>{review.owner}</strong> rated <strong>{review.rating}/5</strong>
                <p>{review.text}</p>
              </div>
            ))
          ) : (
            <p>No reviews yet. Be the first to share your experience!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AboutPage;

