const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const app = express();
mongoose.connect(
  "mongodb+srv://malahimaamir:53OsMDOqMmm900YX@employeedb.3wj2a4n.mongodb.net/?retryWrites=true&w=majority&appName=employeeDB",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const UserSchema = mongoose.Schema({
  name: String,
  age: Number,
});

const UserModel = mongoose.model("employees", UserSchema);

app.get("/", async (req, res) => {
  const users = await UserModel.find();
  let userList = users
    .map(
      (user) => `
      <li>
        ${user.name} (${user.age} years old)
        <form method="POST" action="/delete" style="display:inline">
          <input type="hidden" name="id" value="${user._id}" />
          <button type="submit">Delete</button>
        </form>
      </li>`
    )
    .join("");

  res.send(`
  <html>
    <head>
      <style>
        body {
          margin: 0;
          padding: 0;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%);
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          color: #333;
        }

        .container {
          background: white;
          padding: 30px;
          border-radius: 15px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
          width: 90%;
          max-width: 500px;
        }

        h1, h2 {
          text-align: center;
          color: #444;
        }

        form {
          display: flex;
          flex-direction: column;
          gap: 15px;
          margin-bottom: 30px;
        }

        input {
          padding: 10px;
          font-size: 16px;
          border: 2px solid #ccc;
          border-radius: 8px;
          outline: none;
          transition: 0.3s;
        }

        input:focus {
          border-color: #66a6ff;
        }

        button {
          padding: 10px;
          font-size: 16px;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          color: white;
          background: linear-gradient(to right, #00c6ff, #0072ff);
          transition: 0.3s;
        }

        button:hover {
          transform: scale(1.05);
        }

        ul {
          list-style: none;
          padding: 0;
        }

        li {
          background: #f0f4ff;
          margin: 10px 0;
          padding: 10px;
          border-radius: 8px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        form.delete-form {
          display: inline;
        }

        .delete-btn {
          background: linear-gradient(to right, #ff416c, #ff4b2b);
          color: white;
          padding: 5px 10px;
          border-radius: 5px;
          border: none;
          cursor: pointer;
        }

        .delete-btn:hover {
          transform: scale(1.1);
        }
      </style>
      <script>
        window.onload = function() {
          const urlParams = new URLSearchParams(window.location.search);
          if (urlParams.get('action') === 'added') {
            alert('Employee added successfully!');
          }
          if (urlParams.get('action') === 'deleted') {
            alert('Employee deleted successfully!');
          }
        }
      </script>
    </head>
    <body>
      <div class="container">
        <h1>Add Employee</h1>
        <form method="POST" action="/add">
          <input type="text" name="name" placeholder="Name" required />
          <input type="number" name="age" placeholder="Age" required />
          <button type="submit">Add</button>
        </form>

        <h2>Employee List</h2>
        <ul>
          ${userList}
        </ul>
      </div>
    </body>
  </html>
`);
});

app.post("/add", async (req, res) => {
  const { name, age } = req.body;
  await UserModel.create({ name, age });
  res.redirect("/");
});

app.post("/delete", async (req, res) => {
  const { id } = req.body;
  await UserModel.findByIdAndDelete(id);
  res.redirect("/");
});

app.listen(3001, () => {
  console.log("Server is running on http://localhost:3001");
});
