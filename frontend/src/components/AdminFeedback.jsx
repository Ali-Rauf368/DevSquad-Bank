// Frontend (React) - Admin Feedback View (JSX)
import { useEffect, useState } from "react";
import axios from "axios";

const AdminFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/aboutus/feedbacks")
      .then((response) => {
        setFeedbacks(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError("Error fetching feedbacks");
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading feedback...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Admin Feedback Panel</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Message</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {feedbacks.map((feedback) => (
            <tr key={feedback._id}>
              <td>{feedback.name}</td>
              <td>{feedback.email}</td>
              <td>{feedback.message}</td>
              <td>{feedback.type}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminFeedback;