import "./App.css";

import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";

import StudentForm from "./components/StudentForm";
import AlumniForm from "./components/AlumniForm";
import FindMentor from "./components/FindMentor";
import SessionManager from "./components/SessionManager";
import Report from "./components/Report";


/* =========================
   HOME
========================= */

function Home() {
  return (
    <div className="home-page">

      <section className="home-hero">

        <div className="hero-content">

          <span className="hero-label">
            ALUMNI • STUDENT • CONNECTION
          </span>

          <h1>
            Connect with the right
            <span> mentor.</span>
          </h1>

          <p>
            MentorConnect helps students discover alumni mentors
            based on their interests, expertise and learning goals.
          </p>

          <div className="hero-actions">

            <Link
              to="/find-mentor"
              className="primary-button"
            >
              Find a Mentor
            </Link>

            <Link
              to="/students"
              className="secondary-button"
            >
              Join as Student
            </Link>

          </div>

        </div>

      </section>


      <section className="home-features">

        <div className="feature-item">

          <div className="feature-icon">
            🎯
          </div>

          <h3>
            Smart Matching
          </h3>

          <p>
            Find mentors based on shared interests and expertise.
          </p>

        </div>


        <div className="feature-item">

          <div className="feature-icon">
            🤝
          </div>

          <h3>
            Easy Connection
          </h3>

          <p>
            Connect with alumni who can guide your career journey.
          </p>

        </div>


        <div className="feature-item">

          <div className="feature-icon">
            📅
          </div>

          <h3>
            Track Sessions
          </h3>

          <p>
            Schedule and manage your mentorship sessions easily.
          </p>

        </div>


        <div className="feature-item">

          <div className="feature-icon">
            📊
          </div>

          <h3>
            Track Progress
          </h3>

          <p>
            Monitor your mentorship engagement and activity.
          </p>

        </div>

      </section>

    </div>
  );
}


/* =========================
   STUDENTS
========================= */

function Students() {
  return (
    <section className="application-page">

      <div className="application-intro">

        <span>
          STUDENT PORTAL
        </span>

        <h2>
          Start your
          <strong> mentorship journey.</strong>
        </h2>

        <p>
          Tell us about yourself and the areas you are interested in.
          MentorConnect will help you connect with alumni who can
          provide relevant guidance.
        </p>

        <div className="info-points">

          <div>
            <b>01</b>
            <span>
              Register your profile
            </span>
          </div>

          <div>
            <b>02</b>
            <span>
              Select your interests
            </span>
          </div>

          <div>
            <b>03</b>
            <span>
              Find a suitable mentor
            </span>
          </div>

        </div>

      </div>


      <div className="application-card">

        <StudentForm />

      </div>

    </section>
  );
}


/* =========================
   MENTORS
========================= */

function Mentors() {
  return (
    <section className="application-page">

      <div className="application-intro">

        <span>
          ALUMNI PORTAL
        </span>

        <h2>
          Share knowledge.
          <strong> Inspire students.</strong>
        </h2>

        <p>
          Register as an alumni mentor, select your areas of expertise
          and help students grow through meaningful mentorship.
        </p>

        <div className="info-points">

          <div>
            <b>01</b>
            <span>
              Create your mentor profile
            </span>
          </div>

          <div>
            <b>02</b>
            <span>
              Add your expertise
            </span>
          </div>

          <div>
            <b>03</b>
            <span>
              Guide students
            </span>
          </div>

        </div>

      </div>


      <div className="application-card">

        <AlumniForm />

      </div>

    </section>
  );
}


/* =========================
   FIND MENTOR
========================= */

function FindMentorPage() {
  return (
    <section className="matching-page">

      <div className="matching-card">

        <FindMentor />

      </div>

    </section>
  );
}


/* =========================
   SESSIONS
========================= */

function Sessions() {
  return (
    <section className="dashboard-page">

      <div className="dashboard-header">

        <div>

          <span>
            MENTORSHIP MANAGEMENT
          </span>

          <h2>
            Manage your sessions.
          </h2>

          <p>
            Schedule, complete and manage your mentorship meetings
            in one place.
          </p>

        </div>

      </div>


      <div className="dashboard-card">

        <SessionManager />

      </div>

    </section>
  );
}


/* =========================
   REPORTS
========================= */

function Reports() {
  return (
    <section className="dashboard-page">

      <div className="dashboard-header">

        <div>

          <span>
            ENGAGEMENT ANALYTICS
          </span>

          <h2>
            Track mentorship engagement.
          </h2>

          <p>
            View session activity and engagement details
            for each mentorship pair.
          </p>

        </div>

      </div>


      <div className="dashboard-card">

        <Report />

      </div>

    </section>
  );
}


/* =========================
   APP
========================= */

function App() {
  return (
    <BrowserRouter>

      <div className="app">

        <header className="navbar">

          <Link
            to="/"
            className="logo"
          >
            MentorConnect
          </Link>


          <nav>

            <Link to="/">
              Home
            </Link>

            <Link to="/students">
              Students
            </Link>

            <Link to="/mentors">
              Mentors
            </Link>

            <Link to="/find-mentor">
              Find a Mentor
            </Link>

            <Link to="/sessions">
              Sessions
            </Link>

            <Link to="/reports">
              Reports
            </Link>

          </nav>

        </header>


        <main>

          <Routes>

            <Route
              path="/"
              element={<Home />}
            />

            <Route
              path="/students"
              element={<Students />}
            />

            <Route
              path="/mentors"
              element={<Mentors />}
            />

            <Route
              path="/find-mentor"
              element={<FindMentorPage />}
            />

            <Route
              path="/sessions"
              element={<Sessions />}
            />

            <Route
              path="/reports"
              element={<Reports />}
            />

          </Routes>

        </main>

      </div>

    </BrowserRouter>
  );
}

export default App;