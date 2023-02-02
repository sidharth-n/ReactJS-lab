import React, { useState, useEffect } from "react";
import Story from "./story";
import "./style.css";

const HackerNews = () => {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    fetch("https://hacker-news.firebaseio.com/v0/topstories.json")
      .then((response) => response.json())
      .then(async (data) => {
        const storyPromises = data
          .slice(0, 1)
          .map((storyId) =>
            fetch(
              `https://hacker-news.firebaseio.com/v0/item/${storyId}.json`
            ).then((res) => res.json())
          );
        const storyData = await Promise.all(storyPromises);
        console.log(storyData);
        setStories(storyData);
      });
  }, []);

  return (
    <div className="main">
      <div className="top">
        <div className="top-head">
          Hacker News
          <div className="top-sub">
            new | past | comments | ask | show | jobs | submit
          </div>
        </div>
        <div className="login">login</div>
      </div>
      <ol className="news">
        {stories.map((story) => (
          <li>
            <Story props={story} />
          </li>
        ))}
      </ol>
    </div>
  );
};

export default HackerNews;
