import { useState } from "react";
import "./App.css";
import Task from "./TaskList";

function App() {
  const [task, setTask] = useState({ title: "" });
  const [taskList, setTaskList] = useState([]);

  function handleDelete(deleteTask) {
    let newTaskList = taskList.filter((task) => task.title !== deleteTask);
    setTaskList(newTaskList);
  }

  function handleDone(index) {
    let newTaskList = [...taskList];
    newTaskList[index].isDone = !newTaskList[index].isDone;
    setTaskList(newTaskList);
  }

  function handleChange(e) {
    setTask({
      ...task,
      title: e.target.value,
    });
  }

  function handleAddClick() {
    setTaskList([
      ...taskList,
      {
        title: task.title,
        isDone: false,
      },
    ]);
    setTask({
      title: "",
    });
  }

  return (
    <div className="flex flex-col p-4 bg-slate-100 h-screen ">
      <div className="bg-blue-500 text-white font-bold py-2 px-4 rounded ">
        Task Manager
      </div>
      <div className="mt-4 flex-grow overflow-y-scroll">
        {taskList.map((task, index) => (
          <Task
            key={index}
            title={task.title}
            onDelete={handleDelete}
            isDone={task.isDone}
            onDone={() => handleDone(index)}
          />
        ))}
      </div>
      <div className="flex items-center mt-4">
        <input
          type="text"
          placeholder="Add task"
          value={task.title}
          onChange={handleChange}
          className="block w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
        />
        <button
          onClick={handleAddClick}
          className=" ml-2 px-6 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
        >
          Add
        </button>
      </div>
    </div>
  );
}

export default App;

/* import { useState } from "react";
import "./App.css";
import Task from "./TaskList";

function App() {
  const [task, setTask] = useState(null);
  const [taskList, setTaskList] = useState([]);
  function handleDelete(deleteTask) {
    let newsTaskList = taskList.filter((task) => task.title != deleteTask);
    setTaskList(newsTaskList);
  }
  function handleDone() {
    setTask({
      ...task,
      isDone: !task.isDone,
    });
  }
  function handleChange(e) {
    if (!task) {
      setTask({
        title: e.target.value,
      });
    } else {
      setTask({
        ...task,
        title: e.target.value,
      });
    }
  }

  function handleAddClick() {
    setTaskList({
      ...task,
      title: task,
      isDone: false,
    });
    setTask("");
  }

  return (
    <div className="flex flex-col p-4 bg-blue-100 h-screen ">
      <div className="bg-blue-500 text-white font-bold py-2 px-4 rounded ">
        Task Manager
      </div>
      <div className="mt-4 flex-grow overflow-y-scroll">
        {taskList.map((task) => (
          <Task
            title={task.title}
            onDelete={handleDelete}
            isDone={task.isDone}
            onDone={handleDone}
          />
        ))}
      </div>
      <div className="flex items-center mt-4">
        <input
          type="text"
          placeholder="Add task"
          value={task.title}
          onChange={handleChange}
          className="block w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
        />
        <button
          onClick={handleAddClick}
          className=" ml-2 px-6 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
        >
          Add
        </button>
      </div>
    </div>
  );
}

export default App; */

/* import { useState } from "react";
import "./App.css";
import Task from "./TaskList";

function App() {
  const [task, setTask] = useState("");
  const [taskList, setTaskList] = useState([]);

  const handleAddClick = () => {
    setTaskList([...taskList, task]);
    setTask("");
  };

  return (
    <div className="flex flex-col p-4 bg-blue-100 h-screen ">
      <div className="bg-blue-500 text-white font-bold py-2 px-4 rounded ">
        Task Manager
      </div>
      <div className="mt-4 flex-grow overflow-y-scroll">
        {taskList.map((task) => (
          <Task title={task} />
        ))}
      </div>
      <div className="flex items-center mt-4">
        <input
          type="text"
          placeholder="Add task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          className="block w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
        />
        <button
          onClick={handleAddClick}
          className=" ml-2 px-6 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
        >
          Add
        </button>
      </div>
    </div>
  );
}

export default App;
 */
