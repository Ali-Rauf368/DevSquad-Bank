import React, { useState, useEffect } from "react";
import "./News.css";

const News = () => {
  const [newsList, setNewsList] = useState([]);
  const [error, setError] = useState(null);
  const [expanded, setExpanded] = useState({});

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/finance/content"); 
        if (!response.ok) {
          throw new Error("Failed to fetch news");
        }
        const data = await response.json();

        const transformedNews = data.map((item) => ({
          id: item._id,
          title: item.title,
          date: new Date(item.date).toLocaleDateString(),
          description: item.content,
          image: item.image.startsWith("http") ? item.image : `http://localhost:5000/${item.image}`,
        }));

        setNewsList(transformedNews);
      } catch (error) {
        console.error("Error fetching news:", error);
        setError(error.message || "Failed to fetch news");
      }
    };

    fetchNews();
  }, []);

  const toggleReadMore = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="news-container">
      <h1 className="news-header">DevSquad Latest News</h1>
      {error && <p className="error-message">{error}</p>}
      <div className="news-list">
        {newsList.map((newsItem) => (
          <div key={newsItem.id} className="news-item">
            <div className="news-image-container">
              <img
                src={newsItem.image}
                alt={newsItem.title}
                className="news-image"
              />
            </div>
            <div className="news-content">
              <h2>{newsItem.title}</h2>
              <p className="news-date">{newsItem.date}</p>
              <p>
                {expanded[newsItem.id] ? newsItem.description : newsItem.description.slice(0, 100) + "..."}
              </p>
              <button className="read-more-button" onClick={() => toggleReadMore(newsItem.id)}>
                {expanded[newsItem.id] ? "Show Less" : "Read More"}
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="back-to-top">
        <a href="#top">⬆ Back to Top</a>
      </div>
    </div>
  );
};

export default News;