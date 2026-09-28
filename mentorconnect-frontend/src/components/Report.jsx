import { useState } from "react";

function Report() {
  const [mentorshipPairId, setMentorshipPairId] = useState("");
  const [report, setReport] = useState(null);
  const [message, setMessage] = useState("");

  const fetchReport = async () => {
    if (!mentorshipPairId) {
      setMessage("Please enter Mentorship Pair ID.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8080/api/sessions/mentorship/${mentorshipPairId}/report`
      );

      if (response.ok) {
        const data = await response.json();

        setReport(data);
        setMessage("");
      } else {
        const errorData = await response.json();
        setMessage(errorData.message || "Failed to fetch report.");
        setReport(null);
      }
    } catch (error) {
      setMessage("Backend connection failed.");
      setReport(null);
    }
  };

  return (
    <div className="form-container">
      <h2>Mentorship Report</h2>

      <input
        type="number"
        placeholder="Mentorship Pair ID"
        value={mentorshipPairId}
        onChange={(e) => setMentorshipPairId(e.target.value)}
      />

      <button onClick={fetchReport}>
        View Report
      </button>

      {message && <p>{message}</p>}

      {report && (
        <div className="report-card">

          <h3>Mentorship Engagement Report</h3>

          <p>
            <strong>Mentorship Pair ID:</strong>{" "}
            {report.mentorshipPairId}
          </p>

          <p>
            <strong>Alumni:</strong>{" "}
            {report.alumniName}
          </p>

          <p>
            <strong>Student:</strong>{" "}
            {report.studentName}
          </p>

          <p>
            <strong>Total Sessions:</strong>{" "}
            {report.totalSessions}
          </p>

          <p>
            <strong>Completed Sessions:</strong>{" "}
            {report.completedSessions}
          </p>

          <p>
            <strong>Scheduled Sessions:</strong>{" "}
            {report.scheduledSessions}
          </p>

          <p>
            <strong>Cancelled Sessions:</strong>{" "}
            {report.cancelledSessions}
          </p>

        </div>
      )}
    </div>
  );
}

export default Report;