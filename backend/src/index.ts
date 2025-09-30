import express, { Application, Request, Response } from "express";
import cors from "cors";
// import { v4 as uuidv4 } from "uuid";
const app: Application = express();
const port = 4000;

const tasks = [
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
  // const id = uuidv4();
  const { name } = req.body;
  tasks.unshift({ id: "12", name });
  res.status(201).send("Created");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
