"use client";
import { useEffect, useState } from "react";
type Task = { id: string; name: string; isCompleted: boolean };
export default function Home() {
  const [newTask, setNewTask] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [status, setStatus] = useState("All");

  const [editingId, setEditingId] = useState("");

  async function createNewTask() {
    if (newTask) {
      await fetch("http://localhost:4000/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: newTask }),
      });
      loadTasks();
      setNewTask("");
    }
  }
  function loadTasks() {
    fetch("http://localhost:4000/tasks")
      .then((res) => res.json())
      .then((data) => {
        setTasks(data);
      });
  }

  async function editTask(task: Task) {
    setEditingId(task.id);
    // const newName = prompt("Edit", task.name);
    // if (newName) {
    //   await fetch(`http://localhost:4000/tasks/${task.id}`, {
    //     method: "PUT",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ name: newName }),
    //   });

    //   loadTasks();
    // }
  }

  async function toggleCompleted(id: string) {
    await fetch(`http://localhost:4000/tasks/${id}/check`, {
      method: "PATCH",
    });
  }

  async function deleteTask(id: string) {
    if (confirm("u sure?")) {
      await fetch(`http://localhost:4000/tasks/${id}`, {
        method: "DELETE",
      });

      loadTasks();
    }
  }

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <div className="m-8">
      <div className="max-w-[377px] items-center mx-auto py-6 px-4 rounded-md mt-15 shadow-lg/16 ">
        <div className="flex flex-col gap-5">
          <h1 className="leading-7 font-semibold text-xl flex justify-center">
            To-Do list
          </h1>
          <div className="flex gap-1.5">
            <input
              placeholder="Add a new task..."
              className="input hover:border-[#2463EB] hover:border-2 "
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
            />
            <button
              disabled={!newTask}
              className="btn border rounded-md px-4 py-2 bg-[#3C82F6] text-white font-normal text-sm leading-[100%]"
              onClick={createNewTask}
            >
              Add
            </button>
          </div>

          <div role="tablist" className="tabs tabs-box mt-5">
            {["All", "Active", "Completed"].map((s) => (
              <a
                key={s}
                role="tab"
                onClick={() => setStatus(s)}
                className={`tab flex-1 ${status === s ? "tab-active" : ""}`}
              >
                {s}
              </a>
            ))}
          </div>

          {tasks.map((task) => (
            <div
              className="card p-4 border border-base-300 mt-4 bg-[#F9FAFB]"
              key={task.id}
            >
              {editingId === task.id ? (
                <div className="flex gap-3">
                  <input defaultValue={task.name} />
                  <button>Done</button>
                </div>
              ) : (
                <div
                  onClick={() => editTask(task)}
                  className="flex items-center gap-1 cursor-pointer"
                >
                  <input
                    onChange={() => {
                      toggleCompleted(task.id);
                    }}
                    defaultChecked={task.isCompleted}
                    type="checkbox"
                    className="checkbox checkbox-info"
                  />
                  <div className="flex-1">{task.name}</div>
                  {/* <button
                    onClick={() => editTask(task)}
                    className="btn btn-xs btn-ghost"
                  >
                    Edit
                  </button> */}
                  <button
                    className="bg-[#FEF2F2] text-[#EF4444] text-sm font-normal rounded-md py-1.5 px-3"
                    onClick={() => deleteTask(task.id)}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        <h2 className="mt-10 flex gap-1 font-normal text-xs justify-center">
          <span className="text-[#6B7280]">Powered by</span>
          <span className="text-[#3B73ED]">Pinecone academy</span>
        </h2>
      </div>
    </div>
  );
}
