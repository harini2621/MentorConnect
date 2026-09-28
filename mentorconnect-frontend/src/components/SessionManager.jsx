import { useState } from "react";

function SessionManager() {
  const [studentId, setStudentId] = useState("");
  const [mentorship, setMentorship] = useState(null);

  const [scheduledDate, setScheduledDate] = useState("");
  const [scheduledTime, setScheduledTime] = useState("");
  const [notes, setNotes] = useState("");

  const [sessions, setSessions] = useState([]);
  const [message, setMessage] = useState("");

  const [loadingMentorship, setLoadingMentorship] = useState(false);

  // Find student's active mentorship
  const findMyMentorship = async () => {
    if (!studentId) {
      setMessage("Please enter your Student ID.");
      return;
    }

    setLoadingMentorship(true);
    setMessage("");
    setMentorship(null);
    setSessions([]);

    try {
      const response = await fetch(
        `http://localhost:8080/api/mentorships/student/${studentId}/active`
      );

      if (response.ok) {
        const data = await response.json();

        setMentorship(data);
        setMessage("Active mentorship found!");

        fetchSessions(data.id);
      } else {
        const errorData = await response.json().catch(() => ({}));

        setMessage(
          errorData.message ||
            "No active mentorship found for this student."
        );
      }
    } catch (error) {
      setMessage("Backend connection failed.");
    } finally {
      setLoadingMentorship(false);
    }
  };

  // Fetch sessions using Pair ID internally
  const fetchSessions = async (pairId = mentorship?.id) => {
    if (!pairId) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8080/api/sessions/mentorship/${pairId}`
      );

      if (response.ok) {
        const data = await response.json();
        setSessions(data);
      } else {
        setMessage("Failed to fetch sessions.");
      }
    } catch (error) {
      setMessage("Backend connection failed.");
    }
  };

  // Schedule new session
  const scheduleSession = async () => {
    if (!mentorship) {
      setMessage("Please find your active mentorship first.");
      return;
    }

    if (!scheduledDate || !scheduledTime) {
      setMessage("Please select session date and time.");
      return;
    }

    // Combine date and time for backend
    const scheduledAt = `${scheduledDate}T${scheduledTime}`;

    try {
      const response = await fetch(
        `http://localhost:8080/api/sessions?mentorshipPairId=${mentorship.id}&scheduledAt=${scheduledAt}&notes=${encodeURIComponent(
          notes
        )}`,
        {
          method: "POST",
        }
      );

      if (response.ok) {
        setMessage("Session scheduled successfully!");

        setScheduledDate("");
        setScheduledTime("");
        setNotes("");

        fetchSessions(mentorship.id);
      } else {
        const errorData = await response.json().catch(() => ({}));

        setMessage(
          errorData.message ||
            "Failed to schedule session."
        );
      }
    } catch (error) {
      setMessage("Backend connection failed.");
    }
  };

  // Complete session
  const completeSession = async (sessionId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/sessions/${sessionId}/complete`,
        {
          method: "PUT",
        }
      );

      if (response.ok) {
        setMessage("Session completed successfully!");

        fetchSessions();
      } else {
        const errorData = await response.json().catch(() => ({}));

        setMessage(
          errorData.message ||
            "Failed to complete session."
        );
      }
    } catch (error) {
      setMessage("Backend connection failed.");
    }
  };

  // Cancel session
  const cancelSession = async (sessionId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/sessions/${sessionId}/cancel`,
        {
          method: "PUT",
        }
      );

      if (response.ok) {
        setMessage("Session cancelled successfully!");

        fetchSessions();
      } else {
        const errorData = await response.json().catch(() => ({}));

        setMessage(
          errorData.message ||
            "Failed to cancel session."
        );
      }
    } catch (error) {
      setMessage("Backend connection failed.");
    }
  };

  return (
    <div className="form-container">
      <h2>Mentorship Sessions</h2>

      {/* Student ID */}
      <label>Student ID</label>

      <input
        type="number"
        placeholder="Enter Student ID"
        value={studentId}
        onChange={(e) => setStudentId(e.target.value)}
      />

      <button onClick={findMyMentorship}>
        {loadingMentorship
          ? "Finding..."
          : "Find My Mentorship"}
      </button>

      {/* Active Mentorship Details */}
      {mentorship && (
        <div className="session-card">
          <h3>Active Mentorship</h3>

          <p>
            <strong>Student:</strong>{" "}
            {mentorship.student?.name}
          </p>

          <p>
            <strong>Mentor:</strong>{" "}
            {mentorship.alumni?.name}
          </p>

          <p>
            <strong>Department:</strong>{" "}
            {mentorship.alumni?.department}
          </p>

          <p>
            <strong>Status:</strong>{" "}
            {mentorship.status}
          </p>
        </div>
      )}

      {/* Schedule Session */}
      {mentorship && (
        <div className="schedule-section">
          <h3>Schedule a Session</h3>

          {/* Date */}
          <div className="schedule-field">
            <label>Session Date</label>

            <input
              type="date"
              value={scheduledDate}
              onChange={(e) =>
                setScheduledDate(e.target.value)
              }
            />
          </div>

          {/* Time */}
          <div className="schedule-field">
            <label>Session Time</label>

            <input
              type="time"
              value={scheduledTime}
              onChange={(e) =>
                setScheduledTime(e.target.value)
              }
            />
          </div>

          {/* Notes */}
          <div className="schedule-field">
            <label>Session Notes (Optional)</label>

            <textarea
              placeholder="Enter session notes if needed..."
              value={notes}
              onChange={(e) =>
                setNotes(e.target.value)
              }
            />
          </div>

          <button onClick={scheduleSession}>
            Schedule Session
          </button>

          <button
            onClick={() =>
              fetchSessions(mentorship.id)
            }
          >
            Refresh Sessions
          </button>
        </div>
      )}

      {/* Message */}
      {message && (
        <p className="session-message">
          {message}
        </p>
      )}

      {/* Sessions List */}
      {sessions.length > 0 && (
        <div className="sessions-list">
          <h3>Sessions</h3>

          {sessions.map((session) => (
            <div
              className="session-card"
              key={session.id}
            >
              <p>
                <strong>Session ID:</strong>{" "}
                {session.id}
              </p>

              <p>
                <strong>Scheduled:</strong>{" "}
                {session.scheduledAt}
              </p>

              <p>
                <strong>Status:</strong>{" "}
                {session.status}
              </p>

              <p>
                <strong>Notes:</strong>{" "}
                {session.notes || "No notes"}
              </p>

              {session.completedAt && (
                <p>
                  <strong>Completed At:</strong>{" "}
                  {session.completedAt}
                </p>
              )}

              {session.status === "SCHEDULED" && (
                <div className="session-actions">
                  <button
                    onClick={() =>
                      completeSession(session.id)
                    }
                  >
                    Complete
                  </button>

                  <button
                    onClick={() =>
                      cancelSession(session.id)
                    }
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {mentorship && sessions.length === 0 && (
        <p className="no-sessions">
          No sessions scheduled yet.
        </p>
      )}
    </div>
  );
}

export default SessionManager;