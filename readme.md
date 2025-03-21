# 🎯 InfluenceHub

A **powerful influencer marketing platform** designed to help influencers and brands connect, analyze performance, and manage collaborations effortlessly. InfluenceHub provides **data-driven insights, trend analysis, and AI-powered matchmaking** to help influencers grow and brands find the right partners.  

<!-- ![Build Status](https://img.shields.io/github/actions/workflow/status/shk-khalid/influencehub-frontend/ci.yml)  -->
![License: MIT](https://img.shields.io/badge/License-MIT-green?style=for-the-badge&logo=open-source-initiative&logoColor=white)  
![Made with React](https://img.shields.io/badge/Made%20with-React-blue?style=for-the-badge&logo=react&logoColor=white)  
![Built with Vite](https://img.shields.io/badge/Built%20with-Vite-purple?style=for-the-badge&logo=vite&logoColor=white)  
![State Management: Zustand](https://img.shields.io/badge/State%20Management-Zustand-yellow?style=for-the-badge&logo=redux&logoColor=white)  
![CSS: Tailwind](https://img.shields.io/badge/Styling-Tailwind%20CSS-blue?style=for-the-badge&logo=tailwindcss&logoColor=white)  
 


---

## 🏆 **Key Features**  

✅ **📊 Influencer Dashboard** – Track engagement rate, reach, impressions, and performance over time. 

✅ **🔥 Trend Analysis** – Uses the **Reddit API** to fetch trending topics, analyze sentiment, and display top discussions.  

✅ **📈 Brand Insights** – Displays brand valuation history, market share, competitor analysis, and demographics.  

✅ **🤝 AI-Powered Brand Matchmaking** – Matches influencers with brands based on engagement and niche.  

✅ **📂 Data Export & Reports** – Download insights in **Excel format** using `ExcelJS`.  

✅ **🔐 Secure Authentication** – Firebase Auth with JWT-based authentication & **Two-Factor Authentication (2FA)**.  

✅ **🎨 Beautiful UI & Dark Mode** – Built with **Tailwind CSS, Headless UI, and Framer Motion** animations.  

---

## 🌐 Live Demo  

Experience the live application: [InfluenceHub](https://influencehub.vercel.app/)  

---

## 🛠️ Tech Stack  

### 🏗 Frontend  
- **React** (18.3.1) – Core framework for building UI components.  
- **Vite** (5.4.2) – Modern build tool for optimized performance.  
- **TypeScript** (5.7.2) – Strongly-typed JavaScript for better maintainability.  
- **Tailwind CSS** (3.4.1) – Utility-first CSS for responsive design.  
- **Framer Motion** (11.0.8) – Smooth animations and UI transitions.  
- **Zustand** (5.0.1) – Lightweight state management.  
- **React Hook Form** (7.53.2) – Form handling and validation.  
- **Recharts** (2.13.3) – Interactive data visualizations and charts.  
- **Axios** – API calls and data fetching.  

### 📦 Backend API  
InfluenceHub's frontend interacts with a Django-based backend via REST APIs to handle:  
✅ **User Authentication** – Secure login, registration, and profile management.  
✅ **Influencer & Brand Insights** – Fetching analytics and brand details.  
✅ **Brand Matchmaking** – AI-driven brand-influencer recommendations.  
✅ **Trend Analysis** – Data aggregation from external sources like Reddit.  

---

## 🚀 Getting Started  

### Prerequisites  

- **Node.js (v16+)** – Required for running the frontend.  
- **A package manager** – Use either `npm` or `yarn`.  

---

### Installation  

1️⃣ **Clone the repository and navigate to the frontend folder:**  
```bash
git clone https://github.com/shk-khalid/influencehub-frontend.git
cd influencehub-frontend
```

2️⃣ **Install dependencies:**  
```bash
npm install
# or
yarn install
```

3️⃣ **Run the development server:**  
```bash
npm run dev
# or
yarn dev
```

4️⃣ **Build for production:**  
```bash
npm run build
```

---

## 🔧 Environment Variables  

To run this project, create a `.env` file in the root directory and add the following variables:  

```env
VITE_API_BASE_URL=http://localhost:8000
```

## 📡 API Integration  

InfluenceHub's frontend communicates with the backend via REST APIs. The primary API endpoints include:  

### 🔐 Authentication  
- `POST /api/auth/login/` – User login.  
- `POST /api/auth/register/` – User registration.  
- `POST /api/auth/logout/` – Logout session.  

### 📊 Influencer & Brand Insights  
- `GET /api/influencers/{id}/` – Fetch influencer details.  
- `GET /api/brands/{id}/` – Fetch brand details.  
- `GET /api/insights/trends/` – Retrieve trending topics and insights.  

### 🤝 Brand Matchmaking  
- `GET /api/matchmaking/suggestions/` – Get recommended brands for an influencer.  
- `POST /api/matchmaking/request/` – Send a collaboration request.  

Full API documentation is available at:  
```
http://localhost:8000/api/docs
```

---

## 🔄 State Management  

The frontend uses **Zustand** for global state management, handling:  
✅ **User authentication state** (logged-in status, user details).  
✅ **Fetched brand & influencer insights** (stored in global state for reusability).  
✅ **UI preferences and temporary selections**.  

---

## 🖥️ Deployment  

### **Frontend Deployment (Vercel)**  
To deploy on **Vercel**, follow these steps:  

1. Install Vercel CLI:  
   ```bash
   npm install -g vercel
   ```
2. Login to Vercel:  
   ```bash
   vercel login
   ```
3. Deploy the project:  
   ```bash
   vercel --prod
   ```

### **Backend Deployment (Render)**  
The backend can be deployed using **Render** for PostgreSQL database hosting. Update `.env` with production values.  

---

## 🤝 Contributing  

Contributions are welcome! Follow these steps:  

1️⃣ **Fork the repository.**  
2️⃣ **Create a feature branch:**  
```bash
git checkout -b feature/amazing-feature
```
3️⃣ **Commit your changes:**  
```bash
git commit -m "Add an amazing feature"
```
4️⃣ **Push your branch:**  
```bash
git push origin feature/amazing-feature
```
5️⃣ **Open a Pull Request for review.**  

---

## 🛠️ Testing  

Unit tests and integration tests are handled using **React Testing Library** and **Jest**.  

- Run unit tests:  
  ```bash
  npm run test
  ```

- Run end-to-end tests:  
  ```bash
  npm run test:e2e
  ```

---

## 📄 License  

This project is licensed under the **MIT License** – see the [LICENSE](LICENSE) file for details.  

---

## 📞 Contact  

For any questions or collaboration opportunities, feel free to reach out:  

📧 Khalid Shaikh – [shk.khalid18@gmail.com](mailto:shk.khalid18@gmail.com)  

📂 Project Repository: [InfluenceHub Frontend](https://github.com/shk-khalid/influencehub-frontend.git)  

---

**🚀 Happy coding and successful collaborations!**