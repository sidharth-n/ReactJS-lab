import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Loading from "./loading";
import Story from "./story";

export default function Comments() {
  const [story, setStory] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
      .then((response) => response.json())
      .then(async (data) => {
        console.log(data);
        setStory(data);
      });
  }, []);
  return (
    <div className="comments-page">
      <Story props={story} />
      <input className="comment-input" type="text"></input>
      <button className="comment-btn">add comment</button>
      <div className="comments-container">
        <Commentscall id={id} />
      </div>
    </div>
  );
}

function Commentscall({ id }) {
  let CommentData;
  const [loading, setLoading] = useState(true);
  /* console.log("id is :" + id); */
  const [comments, setComments] = useState([]);
  const [story, setStory] = useState([]);
  useEffect(() => {
    fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
      .then((response) => response.json())
      .then(async (data) => {
        console.log(data);
        setStory(data);
        if (data.kids) {
          const storyPromises = data.kids.map((storyId) =>
            fetch(
              `https://hacker-news.firebaseio.com/v0/item/${storyId}.json`
            ).then((res) => res.json())
          );
          CommentData = await Promise.all(storyPromises);
          console.log(CommentData);
        } else {
          CommentData = [...story];
          console.log(story);
        }
        setComments(CommentData);
        /*  console.log(CommentData); */
        setLoading(false);
      });
  }, []);
  return (
    <div className="comment-div">
      {story.text && <CommentStyle comment={story} />}
      <ul className="comments-section">
        {comments.map((comment) => (
          <>
            {comment.text && <CommentStyle comment={comment} />}
            {comment.kids &&
              comment.kids.map((kid) => <Commentscall id={kid} />)}
          </>
        ))}
      </ul>
    </div>
  );
}

function CommentStyle({ comment }) {
  const [margin, setMargin] = useState(40);
  /* setMargin(margin + 20); */
  function hoursPassed(timestamp) {
    const now = Date.now() / 1000; // current time in Unix timestamp (in seconds)
    const difference = now - timestamp; // difference in seconds
    const hours = difference / 3600; // convert to hours
    return Math.floor(hours);
  }
  return (
    <li
      /* className="comments" */
      key={comment.id}
      style={{ marginLeft: `${margin}px` }}
    >
      <div className="comment-head">
        <svg
          className="t-up"
          xmlns="http://www.w3.org/2000/svg"
          width="9"
          height="9"
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
        parent | next | existing : {comment.dead} {console.log(margin)}
      </div>
      <div dangerouslySetInnerHTML={{ __html: comment.text }} />
    </li>
  );
}
