import { useState, useEffect } from "react";
import HackerNews from "./App";
export default function Comments({ id }) {
  const [comments, setComments] = useState([]);
  useEffect(() => {
    fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
      .then((response) => response.json())
      .then(async (data) => {
        const storyPromises = data.kids.map((storyId) =>
          fetch(
            `https://hacker-news.firebaseio.com/v0/item/${storyId}.json`
          ).then((res) => res.json())
        );
        const storyData = await Promise.all(storyPromises);
        setComments(storyData);
        console.log(storyData);
      });
  }, []);

  return (
    <ol>
      {comments.map((comment) => (
        <li>{comment.text}</li>
      ))}
    </ol>
  );
}
