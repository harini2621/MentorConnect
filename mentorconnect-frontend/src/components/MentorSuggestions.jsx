import { useState } from "react";

function MentorSuggestions() {
  const [studentId, setStudentId] = useState("");
  const [mentors, setMentors] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [connectedMentor, setConnectedMentor] = useState(null);

  const findMentors = async () => {
    if (!studentId) {
      setMessage("Please enter your Student ID.");
      return;
    }

    setLoading(true);
    setMessage("");
    setMentors([]);
    setConnectedMentor(null);

    try {
      const response = await fetch(
        `http://localhost:8080/api/mentorships/suggestions/${studentId}`
      );

      if (response.ok) {
        const data = await response.json();

        setMentors(data);

        if (data.length === 0) {
          setMessage("No matching mentors found.");
        }
      } else {
        const errorData = await response.json().catch(() => ({}));

        setMessage(
          errorData.message || "Unable to find mentors."
        );
      }
    } catch (error) {
      setMessage("Backend connection failed.");
    } finally {
      setLoading(false);
    }
  };

  const requestMentorship = async (alumniId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/mentorships?studentId=${studentId}&alumniId=${alumniId}`,
        {
          method: "POST",
        }
      );

      const data = await response.json().catch(() => null);

      if (response.ok) {
        const selectedMentor = mentors.find(
          (mentor) => mentor.id === alumniId
        );

        setConnectedMentor({
          pairId: data?.id,
          mentorName: selectedMentor?.name || "Your mentor",
        });

        setMessage(
          "Mentorship connected successfully!"
        );
      } else {
        setMessage(
          data?.message || "Mentorship request failed."
        );
      }
    } catch (error) {
      setMessage("Backend connection failed.");
    }
  };

  return (
    <div className="fm-content">

      {/* SEARCH BAR */}

      <div className="fm-search-box">

        <div className="fm-input-wrapper">

          <input
            type="number"
            placeholder="Enter Student ID"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
          />

        </div>

        <button
          className="fm-search-button"
          onClick={findMentors}
          disabled={loading}
        >
          {loading ? "Finding..." : "Find Mentor"}
        </button>

      </div>


      {/* SUCCESS CONNECTION */}

      {connectedMentor && (
        <div className="fm-message">

          <strong>
            Mentorship connected successfully!
          </strong>

          <p>
            Mentor: {connectedMentor.mentorName}
          </p>

          <p>
            Mentorship Pair ID: {connectedMentor.pairId}
          </p>

          <p>
            You can now schedule mentorship sessions.
          </p>

        </div>
      )}


      {/* MESSAGE */}

      {message && !connectedMentor && (
        <div className="fm-message">
          {message}
        </div>
      )}


      {/* RESULTS */}

      {mentors.length > 0 && !connectedMentor && (
        <div className="fm-results">

          <div className="fm-results-header">

            <div>
              <span>MATCH RESULTS</span>

              <h3>
                Recommended mentors
              </h3>
            </div>

            <p>
              {mentors.length} available
            </p>

          </div>


          <div className="fm-mentor-grid">

            {mentors.map((mentor) => (

              <div
                className="fm-mentor-card"
                key={mentor.id}
              >

                <div className="fm-profile">

                  <div className="fm-avatar">
                    {mentor.name
                      ? mentor.name.charAt(0).toUpperCase()
                      : "M"}
                  </div>

                  <div className="fm-profile-info">

                    <h4>
                      {mentor.name}
                    </h4>

                    <span>
                      {mentor.department}
                    </span>

                    <small>
                      {mentor.email}
                    </small>

                  </div>

                </div>


                <div className="fm-capacity">

                  <span>
                    MAX MENTEES
                  </span>

                  <strong>
                    {mentor.maxConcurrentMentees}
                  </strong>

                </div>


                <button
                  className="fm-request-button"
                  onClick={() =>
                    requestMentorship(mentor.id)
                  }
                >
                  Request Mentorship
                </button>

              </div>

            ))}

          </div>

        </div>
      )}

    </div>
  );
}

export default MentorSuggestions;