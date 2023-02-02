import Comments from "./comments";
export default function Story({ props }) {
  function hoursPassed(timestamp) {
    const now = Date.now() / 1000; // current time in Unix timestamp (in seconds)
    const difference = now - timestamp; // difference in seconds
    const hours = difference / 3600; // convert to hours
    return Math.floor(hours);
  }
  const UpdateTime = hoursPassed(props.time);
  return (
    <li className="story" key={props.id}>
      <div className="story-top">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="7"
          height="7"
          viewBox="0 0 24 24"
          fill="grey"
          stroke="grey"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
        </svg>
        <div className="story-title">{props.title}</div>
        <a className="story-url" href={props.url}>
          {props.url
            ? `(${props.url.replace("https://", "").replace("www.", "")})`
            : ""}
        </a>
      </div>
      <div className="story-sub">
        {props.score} points by {props.by} {UpdateTime}
        {UpdateTime == 1 ? " hour " : " hours "}
        ago | hide | {props.descendants} <Comments id={props.id} />
      </div>
    </li>
  );
}
