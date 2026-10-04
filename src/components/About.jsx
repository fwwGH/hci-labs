const About = ({ title, text, goalsIntro, goals }) => (
  <section className="about-section">
    <div className="container">
      <h2 className="about-title">{title}</h2>
      <p className="about-text">{text}</p>
      <p className="about-text">{goalsIntro}</p>
      <ul className="about-goals">
        {goals.map((goal) => (
          <li key={goal}>{goal}</li>
        ))}
      </ul>
    </div>
  </section>
);

export default About;
