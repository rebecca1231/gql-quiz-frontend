import React, { useState } from "react";

import emailjs from "emailjs-com";
import { init } from "emailjs-com";
const ID = process.env.REACT_APP_ID;
init(ID);

const About = () => {
  const [sent, setSent] = useState(false);

  function sendEmail(e) {
    e.preventDefault();

    emailjs.sendForm("service_ts0cbib", "template_ymcpv5c", e.target, ID).then(
      (result) => {
        console.log(result.text);
        setSent(true);
      },
      (error) => {
        console.log(error.text);
      }
    );
  }

  return (
    <div style={{ marginLeft: "1rem", maxWidth: "600px", fontSize: "1.15rem" }}>
      <h1>Movie Quiz</h1>
      <div>
        <h4>OMDb API</h4>
        <p>
          All movie data is obtained from The Open Movie Database. It is an open
          source RESTful web service. All content and images are contributed and
          maintained by users. If you would like to know more, please visit{" "}
          <a
            href="https://www.omdbapi.com/"
            className="open-link"
            rel="noopener noreferrer"
            target="_blank"
          >
            OMDb API
          </a>
          .
        </p>
      </div>
      <div
        style={{ marginTop: "2rem", fontSize: "1.15rem", maxWidth: "600px" }}
      >
        <h4>This site is a work in progress.</h4>
        <p>I created it to be a fun quiz application. I hope you like it!</p>

        {sent === false ? (
          <>
            <h3>Thoughts, feedback, issues?</h3>
            <h4>Get in touch</h4>
            <form className="ui form" onSubmit={sendEmail}>
              <input type="hidden" name="contact_number" />
              <div className="field">
                <label>Name</label>
                <input
                  required
                  type="text"
                  name="user_name"
                  placeholder="Your Name"
                />
              </div>
              <div className="field">
                <label>Email</label>
                <input
                  required
                  className="field"
                  type="email"
                  name="user_email"
                  placeholder="email@example.com"
                  style={{ padding: "5px" }}
                />
              </div>
              <div className="field">
                <label>Message</label>

                <textarea
                  required
                  className="field"
                  name="message"
                  placeholder="Write your message here."
                />
              </div>
              <div className="field">
                <input
                  className="ui button basic teal"
                  type="submit"
                  value="Send"
                />
              </div>
            </form>
          </>
        ) : (
          <div>
            <h3 style={{ marginTop: "1rem" }}>Thank you!</h3>
            <p>Your message has been sent!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default About;
