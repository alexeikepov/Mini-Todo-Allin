"use client";

import { getFormData } from "zvijude/form/funcs";
import { Input } from "zvijude/form";
import { Btn } from "zvijude/btns";

import {
  addCategory,
  addTask,
  deleteTask,
  toggleComplete,
  updateTaskCategory,
} from "./action";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
  categoryId?: number;
  createdAt: string;
  completedAt?: string;
}

export default function MainComp({
  todos = [],
  categories = [],
}: {
  todos?: Todo[];
  categories?: any[];
}) {
  const makeOptions = () => (
    <>
      <option value="" disabled>
        Select Category...
      </option>
      {categories.map((c) => (
        <option key={c.id} value={c.id}>
          {c.name}
        </option>
      ))}
    </>
  );

  const grouped = todos.reduce((acc, t) => {
    const category = categories.find((c) => c.id === t.categoryId);
    const name = category.name;
    (acc[name] ||= []).push(t);
    return acc;
  }, {} as Record<string, Todo[]>);

  async function handleAddTask(e) {
    const data = getFormData(e);
    await addTask(data);
    e.target.reset();
  }

  async function handleAddCategory(e) {
    const data = getFormData(e);
    await addCategory(data);
    e.target.reset();
  }

  async function handleToggleCompleted(id: number, completed: boolean) {
    await toggleComplete(id, completed);
  }

  async function handleDeleteTask(id: number) {
    await deleteTask(id);
  }

  async function handleUpdateCategory(id: number, categoryId: number) {
    await updateTaskCategory(id, categoryId);
  }

  return (
    <main className="flex flex-col items-start rounded-md border max-w-[500px] border-black m-5 p-10 ">
      <h1 className="text-3xl font-bold">Create</h1>
      <form
        className="flex border-2 rounded-md border-green-200 bg-green-50 p-2"
        onSubmit={handleAddTask}
      >
        <Input
          name="text"
          lbl="New task:"
          placeholder="Enter task..."
          required
          className=""
        ></Input>
        <div>
          <p>Category Task:</p>
          <div className="flex">
            <select
              name="categoryId"
              required
              className="flex items-center pl-7 px-3 py-2 border rounded-lg"
              defaultValue=""
            >
              <option className="bg-white" value="" disabled>
                Select category...
              </option>
              {categories.map((c) => (
                <option value={c.id} key={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
            <Btn className="bg-blue-400" lbl="Add Task">
              {" "}
            </Btn>
          </div>
        </div>
      </form>

      <form
        className="mt-6 border-2 rounded-md border-green-200 bg-green-50 p-2 w-full"
        onSubmit={handleAddCategory}
      >
        <h2>Create New Category:</h2>
        <div className="flex">
          <Input name="name" placeholder="New category..." required></Input>
          <Btn className="bg-green-400" lbl="Add Category">
            {" "}
          </Btn>
        </div>
      </form>
      <h2 className="font-bold">All Todos ({todos.length})</h2>
      {todos.length === 0 ? (
        <p className="text-gray-500 italic">No todos yet</p>
      ) : (
        <div className="space-y-6 w-full">
          {Object.entries(grouped).map(([cat, tasks]) => (
            <div key={cat}>
              <h3 className="font-bold mb-2">
                {cat} ({tasks.length})
              </h3>
              <div className="space-y-2">
                {tasks.map(({ id, text, completed, categoryId }) => (
                  <div
                    key={id}
                    className={`flex gap-3 p-2 border rounded ${
                      completed ? "bg-gray-50" : "bg-white"
                    }`}
                  >
                    <Btn
                      onClick={() => handleToggleCompleted(id, completed)}
                      lbl={completed ? "✓" : "○"}
                      className={`w-8 h-8 text-sm ${
                        completed ? "bg-green-500 text-white" : "bg-gray-200"
                      }`}
                    />

                    <span
                      className={`flex-1 ${
                        completed
                          ? "line-through text-gray-500 rounded-md pl-1 bg-green-200"
                          : ""
                      }`}
                    >
                      {text}
                    </span>

                    <select
                      value={categoryId || ""}
                      onChange={(e) =>
                        handleUpdateCategory(id, Number(e.target.value))
                      }
                      className="px-3 pl-10 py-1 pr-8 border rounded text-sm min-w-[120px]"
                    >
                      {makeOptions()}
                    </select>

                    <Btn
                      onClick={() => handleDeleteTask(id)}
                      lbl="×"
                      className="bg-red-500 pb-1 text-white w-8 h-8"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
