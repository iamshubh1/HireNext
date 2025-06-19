# HireNext

[![Live Demo](https://img.shields.io/badge/demo-online-brightgreen)](https://hirenext-liard.vercel.app/)  
[![Vite](https://img.shields.io/badge/Vite-%23646cff?logo=vite&logoColor=white)](https://vitejs.dev/)  
[![React](https://img.shields.io/badge/React-%2361DAFB?logo=react&logoColor=white)](https://reactjs.org/)  
[![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-000000?logo=&logoColor=white)](https://ui.shadcn.com/)  
[![Express](https://img.shields.io/badge/Express.js-%23404d59?logo=express&logoColor=white)](https://expressjs.com/)  
[![Node.js](https://img.shields.io/badge/Node.js-%23339933?logo=node.js&logoColor=white)](https://nodejs.org/)  
[![MongoDB](https://img.shields.io/badge/MongoDB-%2347A248?logo=mongodb&logoColor=white)](https://mongodb.com/)

A modern, full‑stack hiring platform that streamlines job posting, candidate management, and interview workflows.

---

## 🚀 Technologies

- **Frontend**: Vite • React • shadcn/ui  
- **Backend**: Express.js • Node.js  
- **Database**: MongoDB (or adjust to your preferred DB)  
- **Deployment**: Vercel (frontend) • Your preferred host (backend)  

---

## 🎯 Features

- **Authentication**: Secure signup/login with JWT  
- **Job Management**: Create, edit, and archive job postings  
- **Candidate Tracking**: View and filter applications per job  
- **Interview Scheduling**: Calendar invites and reminders  
- **Real‑time Chat**: In‑app messaging with candidates  
- **Admin Dashboard**: Analytics on applicants, open roles, and time‑to‑hire  

> 🔥 Check it out live: [HireNext](https://hirenext-liard.vercel.app/)

---

## 💻 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/iamshubh1/HireNext.git
cd HireNext
```

### 2. Backend Setup
```bash
cd backend
npm install
Create a .env file based on .env.example:
```
```dotenv
PORT=1271
MONGODB_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
Start the server:
```
```bash
npm run dev
```
### The API will be available at http://localhost:1271.

## 3. Frontend Setup

```bash
cd ../frontend
npm install
```

Create a .env file:

```dotenv
VITE_API_URL=http://localhost:1271/api/v1/{}
```
Start the development server:
```bash
npm run dev
```
The app will run at http://localhost:5173.
---
## 🗂 Project Structure
```bash
HireNext/
├── backend/            # Express API
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── .env.example
│   └── server.js
├── frontend/           # Vite + React + shadcn/ui
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── App.jsx
│   ├── public/
│   └── vite.config.js
├── LICENSE
└── README.md
```
---
## 🤝 Contributing

Fork this repo

Create a branch (`git checkout -b feature/fooBar`)

Commit your changes (`git commit -m 'Add fooBar'`)

Push to your branch (`git push origin feature/fooBar`)

Open a Pull Request


---

## 🛠️ Scripts

| Command         | Description                      |
| :-------------- | :------------------------------- |
| `npm run dev`   | Run both frontend & backend in dev mode |
| `npm run build` | Build the frontend for production |
| `npm start`     | Start the backend in production mode |


---

## 📫 Contact

HireNext Team

– **Live Demo**: [HireNext](https://hirenext-liard.vercel.app)

– **GitHub**: [iamshubh1/HireNext](https://github.com/iamshubh1/HireNext)

– **Email**: [mail@shubhamJha](mailto:shubhamjha9721@gmail.com)
