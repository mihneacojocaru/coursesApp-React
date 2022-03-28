const express = require("express");

const CoursesRoute = require("./Routes/CoursesRoute.js");
const UsersRoute = require("./Routes/UsersRoute.js");
const cors = require("cors");
const {sequelize} = require('./models');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

//routes

app.use("/api/v1", CoursesRoute);
app.use("/api/v1", UsersRoute);

app.use((errMsg, req, res, next) => {
  const err = new Error(errMsg);
  err.status = 404;
  next(err);
});

app.use((errMsg, req, res, next) => {
  res.status(errMsg.status || 500);
  res.json({
    error: {
      message: errMsg.message,
    },
  });
});

app.listen({ port }, async () => {
  console.log(`Server up on http://localhost:${port}/`);
  await sequelize.sync();
  //await sequelize.sync({ force: true });
  console.log("Database Connected!");
});
