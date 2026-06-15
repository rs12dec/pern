Pern (PostgreSQL, Express, React, Node.js)
-Create a folder as PERN
  1. create folder, server, client
-go to server folder and open terminal window cd server
-npm init -y (y means accept T & C)  
  it will create package.json
-install other dependency
 npm i express pg bcryptjs jsonwebtoken cookie-parser dotenv
 npm i nodemon -D

-changes in package.json
  1. "type": module
  2. "main": "server.js"
  3.  "scripts"{
	   "start": "node server.js"
	   "dev": "nodemon server.js" 
	},

-create new file server.js within server folder

import express from 'express';
2- import dotenv from "dotenv";
2- import cookieParser from "cookie-parser";
3. import cors from 'cors';
3. import authRoutes from "./routes/auth.js";

2- dotenv.config();

cont app =  express()

3. app.use(cors({
  origin= proces.env.CLIENT_URL || "http://localhost:5173"
  creadetiials : true,
}));

2- app.use(express.json());
2- app.use(cookieParser.json());

remove this
app.get("/",(req,res)=>{
    res.send("Hello world")
})

3. app.use("/api/auth", authRoutes);


2- const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})

Run Program => npm run dev

Step 2=> Create database
CREATE TABLE users(
    id serial PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(200) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    createdat TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)


Step 3=> create .env file within server folder
PORT=5000
DB_HOST=localhost
DB_PORT: 5432
DB_NAME:pern_auth
DB_USRE: postgres
DB_PASSWORD: postgres
JWT_SECRET: !@#987654321
CLIENT_URL= http://localhost:5173

Step 3=> Create db.js
-create a folder config
-within config create a file db.js
import {Pool} from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USRE,
    password: process.env.DB_PASSWORD,
});

pool.on("connect", ()=>{
    console.log("connected to the database");
});

pool.on("error",(err)=>{
    console.error("Database error", err);
});

export default pool;

Step 4=> make changes in server.js (marked as 2-)

Step 5 => Creating Routes (auth.js)
Create a folder routes and add a file auth.js
import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '../config/db.js'

const router = express.Router();

create login, register, me, logout functionality

Step 4=> create protect middleware (auth.js)
create a folder middleware and a file as auth.js and protect function in auth.js 
within routes folder

Step 5=> Registering routes with server.js file mark as 3

install cors package


Step 5 => Create frontend on React
install React
-> npm create vite@latest .
Select React
Select JavaScript
Select Roldedown No
Select Install with npm and start now as No

npm install

Step 6 -> Install tailwindcss
in vite.config.js
plugins: react(), tailwindcss(),


src-> index.css
-remove all things
@import "tailwindcss";
-delete app.css as no need more

Step 7 -> App.jsx
function App(){
  return <div>PERN Auth</div>;
}

export default App;

Step 7 -> make changes in index,html

Step 8 -> install mode dependies within frontend folder
npm i axios react-router-dom

*****BUILDING THE FRONTEND******
make changes in App.jsx
replace code as
import {userState} from "react";
import {BrowserRouter as Router, Routes, Rooute, Navigate} from "react-router-dom";
import Navbar from "./components/Navbar";

//after creating home, login & register pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  const [user setUser] = userStat(null);
  const [error, setError] = userState("");
  const [loading, setLoading] = userState(true);

  return (
    <Router>
      <Navbar />
      <Routes>
          <Route path="/" element={ <Home /> } />
          <Route path="/Login" element = { <Login />}
          <Route path="/Register" element = { <Register />}
      </Routes>
    </Router>
  )
}

export default App;

-> create a folder src/components and file Navbar.jsx
-> create a folder src/pages and create Home.jsx, Login.jsx, Register.jsx




