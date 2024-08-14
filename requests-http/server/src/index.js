import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import multipart from "connect-multiparty";

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

const multipartMiddleware = multipart({ uploadDir: "./uploads" });
app.post("/upload", multipartMiddleware, (req, res) => {
  const files = req.files;
  console.log(files);
  res.json({ message: files });
});

app.get("/downloadExcel", (req, res) => {
  res.download("./uploads/report.xlsx");
});

app.get("/downloadPDF", (req, res) => {
  res.download("./uploads/report.pdf");
});

app.use((err, req, res, next) => {
  res.json({ error: err.message })
});

app.listen(8000, () => {
  console.log("Servidor porta 8000");
});