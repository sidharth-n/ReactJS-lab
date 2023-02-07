import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Loading from "./loading";
import Story from "./story";

const Stories = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const cachedData = localStorage.getItem("stories");
    if (cachedData) {
      setStories(JSON.parse(cachedData));
      setLoading(false);
    } else {
      fetch("https://hacker-news.firebaseio.com/v0/topstories.json")
        .then((response) => response.json())
        .then(async (data) => {
          const storyPromises = data
            .slice(0, 100)
            .map((storyId) =>
              fetch(
                `https://hacker-news.firebaseio.com/v0/item/${storyId}.json`
              ).then((res) => res.json())
            );
          const storyData = await Promise.all(storyPromises);

          console.log(storyData);
          setStories(storyData);
          setLoading(false);
          localStorage.setItem("stories", JSON.stringify(storyData));
        });
    }
  }, []);

  return (
    <div>
      {loading && <Loading />}
      <ol className="news">
        {stories.map((story) => (
          <li key={story.id}>
            <Link className="link" to={`/comments/${story.id}`}>
              <Story props={story} />
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Stories;
