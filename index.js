require("dotenv").config(); // Secures variables
const app = require("./utils/app"); // Backend App (server)
const mongo = require("./utils/mongo"); // MongoDB (database)
const { PORT } = require("./constants");
const authRoutes = require("./routes/auth");
const universityRoutes = require("./routes/university");
const professorRoutes = require("./routes/professor");
const ratingRoutes = require("./routes/rating");
const userRoutes = require("./routes/users");

async function bootstrap() {
  await mongo.connect();

  app.get("/", (req, res) => res.status(200).json({ message: "Hello World!" }));

  app.use("/auth", authRoutes);
  app.use("/university", universityRoutes);
  app.use("/professor", professorRoutes);
  app.use("/rating", ratingRoutes);
  app.use("/users", userRoutes);

  app.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}`);
  });
}

bootstrap();
