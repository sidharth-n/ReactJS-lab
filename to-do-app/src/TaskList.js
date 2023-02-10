export default function Task(props) {
  return (
    <>
      <div class=" mt-2 flex w-full max-w-sm overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
        <div class="flex items-center justify-center w-12 bg-yellow-400">
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
            <span class="font-semibold text-yellow-500 dark:text-yellow-300">
              {props.title}
            </span>
            <p class="text-sm text-gray-600 dark:text-gray-200">
              Add sub-title here
            </p>
          </div>
        </div>
        <div class="ml-auto pr-4 flex items-center">
          <svg
            class="ml-6"
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
            <line x1="18" y1="2" x2="22" y2="6"></line>
            <path d="M7.5 20.5 19 9l-4-4L3.5 16.5 2 22z"></path>
          </svg>
          <svg
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
