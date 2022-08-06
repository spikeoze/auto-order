const express = require("express");
const { PrismaClient } = require("@prisma/client");
const cors = require("cors");
const fileupload = require("express-fileupload");
const prisma = new PrismaClient();
const app = express();

// REQUIRE ROUTES
const categoryRouter = require("./routes/category");
const productsRouter = require("./routes/products");

// MIDDLEWARES
app.use(express.json());
app.use(fileupload());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000",
    // methods: "GET, POST, PUT, DELETE",
  })
);
// ROUTES
app.use("/adminpanel", categoryRouter);
app.use("/adminpanel", productsRouter);

app.listen(8080, () => {
  console.log("Serving on port 8080");
});
