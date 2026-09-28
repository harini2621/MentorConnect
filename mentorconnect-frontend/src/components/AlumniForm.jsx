import { useState, useEffect } from "react";

function AlumniForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "",
    maxConcurrentMentees: "",
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

      const response = await fetch("http://localhost:8080/api/alumni", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          department: formData.department,
          maxConcurrentMentees: Number(
            formData.maxConcurrentMentees
          ),
          expertiseTags: selectedTagObjects,
        }),
      });

      if (response.ok) {
        setMessage("Mentor registered successfully!");

        setFormData({
          name: "",
          email: "",
          department: "",
          maxConcurrentMentees: "",
        });

        setSelectedTags([]);
      } else {
        setMessage("Failed to register mentor.");
      }
    } catch (error) {
      setMessage("Backend connection failed.");
    }
  };

  return (
    <div className="form-container">
      <h2>Mentor Registration</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Mentor Name"
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

        <input
          type="number"
          name="maxConcurrentMentees"
          placeholder="Maximum Mentees"
          min="1"
          value={formData.maxConcurrentMentees}
          onChange={handleChange}
          required
        />

        <div className="tags-section">
          <h3>Expertise Tags</h3>

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

        <button type="submit">Register Mentor</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}

export default AlumniForm;