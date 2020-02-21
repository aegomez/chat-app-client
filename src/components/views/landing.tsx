import React from 'react';
import { Link } from 'react-router-dom';

const Landing: React.FC = () => (
  <main className="container">
    <section className="section columns is-vcentered">
      <div className="column">
        <h4 className="title is-size-2">The Chat with No Name</h4>
        <p className="content is-large">
          Free and easy messaging from all over the world.
        </p>
        <div className="buttons are-medium is-centered">
          <Link to="/login" className="button is-link is-outlined">
            Login
          </Link>
          <Link to="/register" className="button is-link">
            Register
          </Link>
        </div>
      </div>
      <div className="column">
        <figure className="image has-background-dark">
          <img
            src="https://res.cloudinary.com/nonamechat/image/upload/q_auto/v1582247412/a35dzp9bvgyg0j8dygq5.jpg"
            alt="Cover image"
          />
        </figure>
      </div>
    </section>
  </main>
);

export { Landing };
