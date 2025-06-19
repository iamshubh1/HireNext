# HireNext

[![Vercel](https://img.shields.io/badge/deployed%20on-Vercel-000?logo=vercel)](https://hirenext-liard.vercel.app/) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

A modern job‑matching platform connecting job seekers and employers. Built with **Next.js**, **React**, and **Tailwind CSS**, and deployed on Vercel.

---

## 🚀 Live Demo

Try it out: https://hirenext-liard.vercel.app/

---

## 📖 Table of Contents

- [Features](#-features)  
- [Tech Stack](#-tech-stack)  
- [Getting Started](#-getting-started)  
  - [Prerequisites](#prerequisites)  
  - [Installation](#installation)  
  - [Environment Variables](#environment-variables)  
  - [Running Locally](#running-locally)  
- [Usage](#-usage)  
- [Contributing](#-contributing)  
- [License](#-license)  
- [Contact](#-contact)  

---

## ✨ Features

- **User Authentication** – Sign up / log in for both **candidates** and **employers**  
- **Role‑Based Dashboards**  
  - _Candidates_ can browse, search, and apply to jobs  
  - _Employers_ can post new listings, review applicants  
- **Job Search** – Filter by keyword, location, category  
- **Job Posting** – Create, update, and archive job vacancies  
- **Application Management** – Track application status  
- **Responsive UI** – Mobile‑first design with Tailwind CSS  
- **Server‑Side Rendering** – Fast initial load and SEO benefits  

*(Add screenshots or GIFs here to showcase the UI.)*

---

## 🛠 Tech Stack

- **Front‑end:** Next.js · React · Tailwind CSS  
- **Auth:** NextAuth.js (or your chosen auth library)  
- **Database:** (e.g. PostgreSQL, MongoDB, SQLite) + ORM/ODM (Prisma, Mongoose, etc.)  
- **API:** Next.js API Routes (or Express)  
- **Deployment:** Vercel  

---

## 🏁 Getting Started

### Prerequisites

- Node.js v14+  
- npm or yarn  
- (Optional) A database service (if not using a file‑based DB)

### Installation

1. **Clone the repo**  
   ```bash
   git clone https://github.com/iamshubh1/HireNext.git
   cd HireNext

2. Install dependencies  
   ```
   npm install
   # or
   yarn install
   ```

3. Configure environment variables  
   Copy the example file and fill in your own values:
   ```
   cp .env.example .env.local
   ```
   Set:
   ```
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-secret
   DATABASE_URL=your-database-connection-string
   # Additional keys (e.g., for email or file uploads)
   ```

### Running Locally

```
npm run dev
# or
yarn dev
```

Open http://localhost:3000 in your browser.
---
## 🎬 Usage
Browse Jobs: View latest listings on the home page.

Search: Use the search bar or filters to find relevant roles.

Apply: Log in as a candidate, fill out your profile, and submit applications.

Post a Job: Log in as an employer, go to your dashboard, and create new postings.

(Describe any other special flows, e.g. email verification, resume upload, notifications.)

---

## 🤝 Contributing
Contributions are welcome! Please:

Fork the repo

Create your feature branch (git checkout -b feature/YourFeature)

Commit your changes (git commit -m 'Add some feature')

Push to the branch (git push origin feature/YourFeature)

Open a Pull Request

Please read CONTRIBUTING.md for details on code style and the PR process.
---
## 📄 License
This project is licensed under the MIT License. See LICENSE for details.
---
## 📬 Contact
Shubh – @iamshubh1
Project Link: https://github.com/iamshubh1/HireNext
