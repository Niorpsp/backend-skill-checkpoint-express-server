import express from "express";
import connectionPool from "./utils/db.mjs";
import questionRouter from "./routes/questions.mjs";

const app = express();

const port = process.env.PORT || 4000;

app.use(express.json());

app.use("/questions", questionRouter);


app.get("/test", (req, res) => {
  return res.json("Server API is working 🚀");
});


app.listen(port, async () => {
  try {
    const result = await connectionPool.query("SELECT NOW();");

    console.log("Database Connected ✅");
    console.log(result.rows);

    console.log(`Server is running at ${port}`);
  } catch (error) {
    console.error("Database Connection Failed ❌");
    console.error(error);
  }
});