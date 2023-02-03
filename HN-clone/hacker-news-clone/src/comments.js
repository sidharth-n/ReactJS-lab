import { useState, useEffect, useRef } from "react";
import HackerNews from "./App";
export default function Comments({ id }) {
  function hoursPassed(timestamp) {
    const now = Date.now() / 1000; // current time in Unix timestamp (in seconds)
    const difference = now - timestamp; // difference in seconds
    const hours = difference / 3600; // convert to hours
    return Math.floor(hours);
  }
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
    <ul>
      {comments.map((comment) => (
        <li
          className="comments"
          key={comment.id}
          style={{ marginLeft: "40px" }}
        >
          <div className="comment-head">
            <svg
              className="t-up"
              xmlns="http://www.w3.org/2000/svg"
              width="11"
              height="11"
              viewBox="0 0 24 24"
              fill="grey"
              stroke="grey"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
            </svg>
            {comment.by} {hoursPassed(comment.time)}
            {hoursPassed(comment.time) == 1 ? " hour " : " hours "} ago | root |
            parent | next
          </div>
          <div dangerouslySetInnerHTML={{ __html: comment.text }} />
          {comment.kids && comment.kids.map((kid) => <Comments id={kid} />)}
        </li>
      ))}
    </ul>
  );
}
