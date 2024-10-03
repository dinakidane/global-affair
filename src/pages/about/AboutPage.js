// src/pages/about/AboutPage.js
import React from "react";
import styles from "../../styles/AboutPage.module.css";

const AboutPage = () => {
  return (
    <div className={styles.AboutPage}>
      <h1>About A Global Affair</h1>
      <p>
        Welcome to **A Global Affair** – the perfect platform for travel lovers
        to share their experiences, post stunning pictures of their favorite
        destinations, and connect with fellow adventurers. Whether you're
        looking to explore new places or relive your favorite trips, this blog
        offers a welcoming community for all things travel.
      </p>
      <p>
        Browse through posts shared by our community, interact with others by
        commenting, liking posts, or even following your favorite travelers. Get
        ready to explore the world, one post at a time!
      </p>
    </div>
  );
};

export default AboutPage;
