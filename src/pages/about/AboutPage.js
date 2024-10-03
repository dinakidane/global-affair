// src/pages/about/AboutPage.js
import React from "react";
import styles from "../../styles/AboutPage.module.css";

const AboutPage = () => {
  return (
    <div className={styles.AboutPage}>
      <h1>About A Global Affair</h1>
      
      <section className={styles.Section}>
        <h2>What We Do</h2>
        <p>
          Welcome to <strong>A Global Affair</strong>, a community-driven platform created for travel enthusiasts from around the world! Our goal is to bring people together who share a love for exploring new places, cultures, and experiences. Whether you're passionate about discovering hidden gems in your local area or embarking on epic international adventures, A Global Affair is the place to share your stories and find inspiration.
        </p>
      </section>

      <section className={styles.Section}>
        <h2>Share Your Travel Experiences</h2>
        <p>
          On A Global Affair, you can post photos and stories from your favorite travel destinations. Share tips, recommendations, and experiences with like-minded travelers, and inspire others to visit the places you've explored. Whether it's a bustling city, a remote village, or a breathtaking natural landscape, your experiences matter here.
        </p>
      </section>

      <section className={styles.Section}>
        <h2>Connect with Other Travelers</h2>
        <p>
          Our platform is more than just a travel blog—it's a community. Follow other travelers, leave comments on their posts, and engage in discussions about your shared passion. You can even mark your favorite posts and keep track of destinations you'd love to visit one day.
        </p>
      </section>

      <section className={styles.Section}>
        <h2>Features</h2>
        <ul>
          <li><strong>Post your travel stories:</strong> Share photos, tips, and detailed stories from your journeys.</li>
          <li><strong>Discover new places:</strong> Browse posts from other travelers and explore their favorite destinations.</li>
          <li><strong>Interact with the community:</strong> Like, comment, and save posts that inspire you.</li>
          <li><strong>Favourites:</strong> Keep a list of your favorite travel experiences and posts.</li>
        </ul>
      </section>

      <section className={styles.Section}>
        <h2>Why Join Us?</h2>
        <p>
          A Global Affair is designed for those who believe that travel is more than just a hobby—it's a way of life. Here, you’ll find a supportive community ready to share in your love of adventure, inspire your next journey, and provide a platform for you to document your experiences for others to enjoy. Join us and be part of a global network of passionate explorers!
        </p>
      </section>

      <section className={styles.Section}>
        <h2>Contact Us</h2>
        <p>
          If you have any questions, feedback, or issues, don’t hesitate to reach out through our <strong>Contact Form</strong>. We value your input and are always looking for ways to improve the platform for our community.
        </p>
      </section>
    </div>
  );
};

export default AboutPage;
