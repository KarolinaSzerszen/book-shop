import express from "express";
import bookRouter from "./routes/book.route.js";

const app = express();

app.use("/books", bookRouter);

app.use((error, req, res, next) => {
  res.status(error.status || 500);

  res.json({
    message: error.message || "Something went wrong!",
    status: error.status,
    stack: error.stack,
  });
});

app.listen(3000, () => {
  console.log("Server is running");
});
