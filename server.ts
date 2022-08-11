import express, { Request, Response } from "express";
import path from "path";

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.static(path.resolve(__dirname, "dist")));

app.use((_: Request, res: Response) => {
  res.sendFile(path.resolve(__dirname, "dist", "index.html"));
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server started on http://localhost:${PORT}`);
});
