import React, { useState, useEffect } from "react";
import { useCurrentUser } from "../../contexts/CurrentUserContext"; // Corrected import path
import axios from "axios";
import styles from "../../styles/AboutPage.module.css";

const AboutPage = () => {
  const currentUser = useCurrentUser();
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ rating: "", content: "" });
  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" });
  const [reviewMessage, setReviewMessage] = useState("");
  const [contactMessage, setContactMessage] = useState("");

  // Fetch reviews from the backend
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get("/reviews/");
        setReviews(response.data.results); // Assuming the response has a "results" array
      } catch (err) {
        console.log(err);
      }
    };
    fetchReviews();
  }, []);

  // Handle review submission
  const handleReviewSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      // Send the review data to the backend
      const response = await axios.post("/reviews/", {
        rating: newReview.rating,
        content: newReview.content,
      });

      // Show success message and reset form
      setReviewMessage("Thank you! Your review has been posted.");
      setNewReview({ rating: "", content: "" }); // Reset the form
      setReviews((prevReviews) => [response.data, ...prevReviews]); // Add new review to reviews list
    } catch (err) {
      // Handle errors
      console.log(err.response?.data || err);
      setReviewMessage("Failed to post review. Please try again.");
    }
  };

  // Handle contact form submission
  const handleContactSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      await axios.post("/contact/", contactForm);
      setContactMessage("Your enquiry/complaint has been sent. We'll review it shortly.");
      setContactForm({ name: "", email: "", message: "" }); // Reset the form after submission
    } catch (err) {
      console.log(err);
    }
  };

  // Handle review deletion
  const handleDeleteReview = async (reviewId) => {
    try {
      await axios.delete(`/reviews/${reviewId}/`);
      // Remove the deleted review from the reviews array
      setReviews((prevReviews) => prevReviews.filter((review) => review.id !== reviewId));
      setReviewMessage("Your review has been deleted.");
    } catch (err) {
      console.log(err.response?.data || err);
      setReviewMessage("Failed to delete review. Please try again.");
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
            Our community thrives on shared stories and breathtaking images that showcase the beauty of our world. From the snow-capped mountains to serene beaches, we believe that every traveler has a unique perspective to offer. Join our vibrant community to discover hidden gems, share travel tips, and connect with fellow adventurers who share your passion for exploration.
          </p>
          <p>
            In addition to sharing your experiences, you can engage with others through comments, likes, and interactions on posts. We encourage our users to support each other by providing feedback and sharing insights based on their journeys. Whether you're a seasoned traveler or just starting your adventures, there's a place for everyone at A Global Affair.
          </p>
        </section>

        {/* Submit Review Form - Only for logged in users */}
        {currentUser && (
          <section className={styles.Section}>
            <h2>Submit a Review</h2>
            <p>Your feedback is valuable to us! Please take a moment to share your thoughts about our platform. Your review will not only help us improve but also assist other users in their travel planning. Rate us on a scale of 1 to 5 and leave a message about your experience!</p>
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
                value={newReview.content}
                onChange={(e) => setNewReview({ ...newReview, content: e.target.value })}
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
            <p>If you have any questions, suggestions, or concerns, feel free to reach out to us through the contact form below. We value your input and aim to respond to all inquiries promptly. Please provide your name, email, and a brief message, and we'll get back to you as soon as possible!</p>
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
          {reviews.length ? (
            reviews.map((review) => (
              <div key={review.id} className={styles.Review}>
                <strong>{review.owner}</strong> rated <strong>{review.rating}/5</strong>
                <p>{review.content}</p>
                {currentUser && currentUser.username === review.owner && (
                  <button onClick={() => handleDeleteReview(review.id)}>Delete</button>
                )}
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



