👥 Employee Manager – Node.js + Express + MongoDB + EJS
A minimal web application to add and delete employees using a beautiful UI powered by HTML/CSS and EJS templating, with data stored in MongoDB. Perfect for beginners learning full-stack development!

🧰 Tech Stack
Technology	Purpose
Node.js	Server runtime
Express.js	Web framework
EJS	Server-side rendering engine
MongoDB	Database for storing employee data
Mongoose	ODM for MongoDB
HTML + CSS	Frontend UI and styling

✨ Features
➕ Add new employee (name + age)

❌ Delete existing employee

✅ EJS dynamic rendering for user list

📦 MongoDB database integration

🧼 Clean, responsive UI with alert messages

🚀 Fast local deployment

📁 Project Structure
├── views/
│   └── index.ejs         # Main frontend page
├── .env                  # MongoDB URI
├── app.js (or index.js)  # Express server setup
├── package.json
└── public/               # (optional) static assets
🧪 How to Use
1. Clone the repository
git clone https://github.com/malahimaamir/YOUR_REPO_NAME.git
cd YOUR_REPO_NAME
2. Install dependencies
npm install
3. Configure Environment Variables
Create a .env file in the root directory and add your MongoDB URI:
MONGODB_URI=mongodb://localhost:27017/employeeDB
4. Start the Server
node app.js
Visit your app at: http://localhost:3001

🔧 Routes
Method	Route	Description
GET	/	Renders all employees
POST	/add	Add new employee
POST	/delete	Delete employee by ID

🖼️ UI Preview
✏️ Add employee form

📋 Dynamic employee list with delete button

📱 Mobile-friendly responsive layout

🛎️ Alert messages via URL query parameters

🙋‍♀️ Author
Malahima Amir
📧 malahimaamir@gmail.com
🔗 GitHub: @malahimaamir

