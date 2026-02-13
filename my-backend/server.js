const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

let messages = [];

app.get("/", (req, res) => {
    res.json({ message: "Backend is running 🚀" });
});

app.get("/api/data", (req, res) => {
    res.json({ name: "Your Name", project: "Free Hosting Project" });
});

app.post("/api/contact", (req, res) => {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
        return res.status(400).json({ error: "All fields are required" });
    }
    messages.push({ name, email, message, date: new Date() });
    res.json({ status: "success", message: "Message saved!" });
});

app.post("/api/admin/login", (req, res) => {
    const { username, password } = req.body;
    if (username === "admin" && password === "1234") {
        res.json({ status: "success", token: "admin-token" });
    } else {
        res.status(401).json({ status: "error", message: "Invalid credentials" });
    }
});

app.get("/api/admin/messages", (req, res) => {
    const token = req.headers.authorization;
    if (token === "admin-token") {
        res.json(messages);
    } else {
        res.status(403).json({ error: "Unauthorized" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
