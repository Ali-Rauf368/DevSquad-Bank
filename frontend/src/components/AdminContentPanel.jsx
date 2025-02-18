// AdminContentPanel.js
import React, { useState, useEffect } from "react";
/* import './AdminContentPanel.css'; */


const AdminContentPanel = () => {
  const [content, setContent] = useState([]);
  const [form, setForm] = useState({
    id: null,
    title: "",
    content: "",
    type: "",
    image: null,
    date: "",
  });
  const [message, setMessage] = useState("");

  // Fetch all content
  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/finance/content");
      if (!response.ok) throw new Error("Failed to fetch content");
      const data = await response.json();
      setContent(data);
    } catch (error) {
      console.error("Error fetching content:", error);
    }
  };

  // Handle form change
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  // Handle file change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setForm((prevForm) => ({
      ...prevForm,
      image: file,
    }));
  };

  // Handle form submission for creating/updating content
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("adminToken");
    if (!token) {
      setMessage("You are not authenticated.");
      return;
    }

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("content", form.content);
    formData.append("type", form.type);
    formData.append("date", form.date);
    if (form.image) formData.append("image", form.image);

    try {
      const response = form.id
        ? await fetch(`http://localhost:5000/api/finance/content/${form.id}`, {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: formData,
          })
        : await fetch("http://localhost:5000/api/finance/content", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: formData,
          });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      setMessage(form.id ? "Content updated successfully!" : "Content created successfully!");
      setForm({ id: null, title: "", content: "", type: "", image: null, date: "" });
      fetchContent(); // Refresh content list
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      setMessage("You are not authenticated.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/finance/content/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      setMessage("Content deleted successfully!");
      fetchContent(); // Refresh content list
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div>
      <h3>Manage Finance Content</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleFormChange}
          placeholder="Title"
          required
        />
        <textarea
          name="content"
          value={form.content}
          onChange={handleFormChange}
          placeholder="Content"
          required
        />
        <input
          type="text"
          name="type"
          value={form.type}
          onChange={handleFormChange}
          placeholder="Type (e.g., Article, Blog)"
          required
        />
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleFormChange}
          required
        />
        <input type="file" onChange={handleFileChange} />
        <button type="submit">
          {form.id ? "Update Content" : "Create Content"}
        </button>
      </form>

      {message && <div>{message}</div>}

      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Content</th>
            <th>Type</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {content.map((item) => (
            <tr key={item._id}>
              <td>{item.title}</td>
              <td>{item.content}</td>
              <td>{item.type}</td>
              <td>{new Date(item.date).toLocaleDateString()}</td>
              <td>
                <button onClick={() => setForm({ ...item })}>Edit</button>
                <button onClick={() => handleDelete(item._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminContentPanel;
