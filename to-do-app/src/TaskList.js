export default function Task({ title, onDelete, isDone, onDone }) {
  const doneStyle = [
    "flex items-center justify-center w-12 bg-green-400",
    "font-semibold text-green-500 ",
  ];
  const pendingStyle = [
    "flex items-center justify-center w-12 bg-yellow-400",
    "font-semibold text-yellow-500 ",
  ];

  function showIsdone() {
    console.log(isDone);
    onDone();
  }

  return (
    <>
      <div class=" mt-2 flex w-full max-w-sm overflow-hidden bg-white rounded-lg shadow-md ">
        <div class={isDone ? doneStyle[0] : pendingStyle[0]}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="grey"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M7 12a5 5 0 0 1 5-5v0a5 5 0 0 1 5 5v6H7v-6Z"></path>
            <path d="M5 20a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v2H5v-2Z"></path>
            <path d="M21 12h1"></path>
            <path d="M18.5 4.5 18 5"></path>
            <path d="M2 12h1"></path>
            <path d="M12 2v1"></path>
            <path d="m4.929 4.929.707.707"></path>
            <path d="M12 12v6"></path>
          </svg>
        </div>

        <div class="px-4 py-2 -mx-3">
          <div class="mx-3">
            <span class={isDone ? doneStyle[1] : pendingStyle[1]}>{title}</span>
            <p class="text-sm text-gray-600 dark:text-gray-200">
              Add sub-title here
            </p>
          </div>
        </div>
        <div class="ml-auto pr-4 flex items-center">
          <svg
            onClick={showIsdone}
            class="ml-6"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke={!isDone ? "gray" : "green"}
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M18 6 7 17l-5-5"></path>
            <path d="m22 10-7.5 7.5L13 16"></path>
          </svg>
          <svg
            onClick={() => {
              onDelete(title);
            }}
            class="ml-4 "
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="gray"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M3 6h18"></path>
            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
            <line x1="10" y1="11" x2="10" y2="17"></line>
            <line x1="14" y1="11" x2="14" y2="17"></line>
          </svg>
        </div>
      </div>
    </>
  );
}
