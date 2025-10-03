import express, { Application, Request, Response } from "express";
import cors from "cors";
import fs from "node:fs";

const app: Application = express();
const port = 4000;

app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

function getTasks() {
  const data = fs.readFileSync("data.text", "utf8");
  const tasks = JSON.parse(data);
  return tasks;
}

function writeTasks(tasks: { id: string; name: string }[]) {
  fs.writeFile("data.text", JSON.stringify(tasks), (err) => {
    if (err) {
      console.error(err);
    }
  });
}

app.get("/tasks", (req: Request, res: Response) => {
  const tasks = getTasks();
  res.send(tasks);
});

app.post("/tasks", (req: Request, res: Response) => {
  const tasks = getTasks();
  const id = new Date().getMilliseconds().toString();
  const { name } = req.body;
  tasks.unshift({ id: id, name });

  writeTasks(tasks);

  res.status(201).send("Created");
});
app.delete("/tasks/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  const tasks = getTasks();

  const newTask = tasks.filter((task: { id: string }) => task.id !== id);
  writeTasks(newTask);
  res.sendStatus(204); // No Content
});

app.put("/tasks/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  const { name } = req.body;
  const tasks = getTasks();
  const index = tasks.findIndex((tasks: { id: string }) => tasks.id === id);
  tasks[index].name = name;
  writeTasks(tasks);
  res.sendStatus(204);
});

app.patch("/tasks/:id/check", (req: Request, res: Response) => {
  const id = req.params.id;
  const tasks = getTasks();
  const index = tasks.findIndex((task: { id: string }) => task.id === id);
  tasks[index].isCompleted = !tasks[index].isCompleted;
  writeTasks(tasks);
  res.sendStatus(204);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
