import { useState, useEffect } from "react";

function StudentForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "",
  });

  const [message, setMessage] = useState("");

  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/tags");

        if (response.ok) {
          const data = await response.json();
          setTags(data);
        }
      } catch (error) {
        console.error("Failed to fetch tags:", error);
      }
    };

    fetchTags();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleTagChange = (e) => {
    const tagId = Number(e.target.value);

    if (e.target.checked) {
      setSelectedTags([...selectedTags, tagId]);
    } else {
      setSelectedTags(
        selectedTags.filter((id) => id !== tagId)
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const selectedTagObjects = tags.filter((tag) =>
        selectedTags.includes(tag.id)
      );

      const response = await fetch("http://localhost:8080/api/students", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          department: formData.department,
          interestTags: selectedTagObjects,
        }),
      });

      if (response.ok) {
        setMessage("Student registered successfully!");

        setFormData({
          name: "",
          email: "",
          department: "",
        });

        setSelectedTags([]);
      } else {
        setMessage("Failed to register student.");
      }
    } catch (error) {
      setMessage("Backend connection failed.");
    }
  };

  return (
    <div className="form-container">
      <h2>Student Registration</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Student Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="department"
          placeholder="Department"
          value={formData.department}
          onChange={handleChange}
          required
        />

        <div className="tags-section">
          <h3>Interested In</h3>

          {tags.length === 0 ? (
            <p>No tags available.</p>
          ) : (
            tags.map((tag) => (
              <label key={tag.id}>
                <input
                  type="checkbox"
                  value={tag.id}
                  checked={selectedTags.includes(tag.id)}
                  onChange={handleTagChange}
                />

                {tag.name}
              </label>
            ))
          )}
        </div>

        <button type="submit">Register Student</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}

export default StudentForm;