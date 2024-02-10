import { format } from "date-fns";

import "./Home.css";

function Home() {
  const dn = new Date();
  const dateNow = {
    day: format(dn, "dd"),
    month: format(dn, "MM"),
    weekday: format(dn, "EE"),
    weekdayDisplay: format(dn, "EEEE")
  };

  return (
    <div className="home" data-testid="home">
      <div className="about" data-testid="about">
        <div className="message" data-testid="message">
          {dateNow.day === "01" && dateNow.month === "01" ? (
            <h3>Happy Chinese New Year</h3>
          ) : dateNow.day === "25" && dateNow.month === "12" ? (
            <h3>Merry Christmas</h3>
          ) : (
            <h3>Happy {dateNow.weekdayDisplay}</h3>
          )}
        </div>
        <h2>Hi I am Shoshta</h2>
        <div className="prompt" data-testid="prompt">
          <p>
            Innovative software developer, problem-solving enthusiast, forever a learner, and passionate explorer,
            driven to craft beauty through code.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;
