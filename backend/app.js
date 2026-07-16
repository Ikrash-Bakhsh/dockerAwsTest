const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const pool = require("./db/connections");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

const PORT = 5000;

// Health Check
app.get("/api/health", async (req, res) => {
    try {
        await pool.query("SELECT NOW()");

        res.json({
            status: "UP",
            database: "Connected"
        });

    } catch (err) {

        res.status(500).json({
            status: "DOWN",
            database: "Disconnected",
            error: err.message
        });

    }
});

// Get Employees
app.get("/api/employees", async (req, res) => {
    try {

        const result = await pool.query(
            "SELECT * FROM employees ORDER BY id"
        );

        res.json(result.rows);

    } catch (err) {

        res.status(500).json({
            error: err.message
        });

    }
});

// Add Employee
app.post("/api/employees", async (req, res) => {

    try {

        const { name, email, department } = req.body;

        const result = await pool.query(
            `INSERT INTO employees(name,email,department)
             VALUES($1,$2,$3)
             RETURNING *`,
            [name, email, department]
        );

        res.status(201).json(result.rows[0]);

    } catch (err) {

        res.status(500).json({
            error: err.message
        });

    }

});

// Delete Employee
app.delete("/api/employees/:id", async (req, res) => {

    try {

        const { id } = req.params;

        await pool.query(
            "DELETE FROM employees WHERE id=$1",
            [id]
        );

        res.json({
            message: "Employee Deleted Successfully"
        });

    } catch (err) {

        res.status(500).json({
            error: err.message
        });

    }

});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});