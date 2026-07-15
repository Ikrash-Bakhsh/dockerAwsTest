const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 5000;

let employees = [
  {
    id: 1,
    name: "Ali",
    email: "ali@example.com",
    department: "IT"
  },
  {
    id: 2,
    name: "Ahmed",
    email: "ahmed@example.com",
    department: "HR"
  }
];

app.get("/api/health", (req, res) => {
  res.json({
    status: "Server Running Successfully"
  });
});

app.get("/api/employees", (req, res) => {
  res.json(employees);
});

app.post("/api/employees", (req, res) => {
  const employee = {
    id: employees.length + 1,
    ...req.body
  };

  employees.push(employee);

  res.status(201).json(employee);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});