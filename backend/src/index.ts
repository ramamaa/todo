import express, { Application, Request, Response } from "express";
import cors from "cors";

const app: Application = express();
const port = 4000;

let tasks = [
  { id: "1", name: "shalaa ugaah" },
  { id: "2", name: "ayagaa ugaah" },
];

app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});
app.get("/tasks", (req: Request, res: Response) => {
  res.send(tasks);
});
app.post("/tasks", (req: Request, res: Response) => {
  const id = new Date().getMilliseconds().toString();
  const { name } = req.body;
  tasks.unshift({ id: id, name });
  res.status(201).send("Created");
});
app.delete("/tasks/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  const newTask = tasks.filter((task) => task.id !== id);
  tasks = newTask;

  res.sendStatus(204); // No Content
});

app.put("/tasks/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  const { name } = req.body;
  const index = tasks.findIndex((tasks) => tasks.id === id);
  tasks[index].name = name;

  res.sendStatus(204);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
