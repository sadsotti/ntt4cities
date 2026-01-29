# NTT4Cities 🏙️

A high-performance, responsive urban dashboard designed to foster citizen engagement and protect city heritage. Built with Angular, Angular Material, and RxJS, this application serves as a bridge between city residents and urban development, facilitating the reporting of ideas and issues through an intuitive interface.

First project developed by me for the **start2impact** Angular Course.

---

## 🚀 Live Demo

👉 **[NTT4Cities Live on Netlify](https://ntt4cities.netlify.app/)** 👈

---

## 🧐 Project Overview

The objective of **NTT4Cities** is to centralize urban management into a secure, scalable platform. Interacting with the **GoRest API**, the app manages complex relations between Users, Posts, and Comments while ensuring high performance and a professional User Experience.

**The Solution:** I implemented a modular architecture with **Lazy Loading** to optimize initial load times. To overcome API limitations, I developed a **"Smart-Save" strategy** that handles user verification/creation automatically, allowing citizens to post updates without needing technical database IDs.

---

## ✨ Key Features

### 🔐 Enterprise-Grade Security
- **Token Authentication:** Custom login flow designed for GoRest Bearer Tokens
- **Auth Interceptor:** Centralized logic that injects security headers into every outgoing request
- **Route Guards:** Protects all dashboard features from unauthorized access

### 👥 Citizen Management Dashboard
- **Real-time Search:** Filtering system by name and email
- **Dynamic Pagination:** Configurable record views (5, 10, 20) with synchronized indexing
- **Full CRUD:** Integrated dialogs for adding and managing urban participants

### 📰 Urban News Feed
- **Automated Engagement:** Intelligent post-creation logic that associates entries with a verified Admin profile
- **Interactive Threads:** Nested comment system with on-demand expansion and local state caching to reduce API overhead

### 🎨 SaaS-Style UI
Modern, professional interface using Angular Material components, featuring a responsive layout and custom animated feedback.

---

## 🏗️ Project Architecture

The codebase follows the **Separation of Concerns (SoC)** principle and utilizes **Lazy Loading** for feature modules.

```
ntt4cities
├── src
│   ├── app
│   │   ├── core                # Global singletons (Services, Guards, Interceptors)
│   │   │   ├── guards          # Route protection logic
│   │   │   ├── interceptors    # HTTP Bearer Token injection
│   │   │   ├── models          # API TypeScript Interfaces
│   │   │   └── services        # Centralized Data Service (GoRest API)
│   │   ├── features            # Lazy Loaded Modules
│   │   │   ├── auth            # Login & Token handling
│   │   │   ├── posts           # Global feed & community interactions
│   │   │   └── users           # Citizen directory & detail views
│   │   ├── shared              # Reusable UI Components & Material Module
│   │   └── store               # NgRx State Management (Actions, Reducers, Effects)
│   ├── assets                  # Static assets (Images, Icons)
│   ├── environments            # Environment-specific configurations
│   ├── _redirects              # Netlify SPA routing configuration
│   └── styles.css              # Global SaaS Design System
├── angular.json                # Angular CLI configuration & Budgets
├── package.json                # Project dependencies & Scripts
└── tsconfig.json               # TypeScript configuration
```

---

## 🛠️ Build & Deployment

To ensure the application runs smoothly on production servers (like Netlify), specific build steps and configurations are implemented.

### 📦 Production Build

The application uses the latest Angular application builder. To generate a production-ready package, run:

```bash
ng build
```

This command generates an optimized bundle in the `dist/ntt4cities/browser` directory.

### 🌐 Netlify Deployment & SPA Routing

Since Angular is a Single Page Application (SPA), server-side redirects are required to prevent **404 Not Found** errors on page refresh.

- **Redirect Config:** A `_redirects` file is included in the `src` folder with the rule: `/* /index.html 200`
- **Deployment Folder:** When deploying manually to Netlify, only the contents of the `dist/ntt4cities/browser` folder should be uploaded

---

## 🛠 Tech Stack

- **Framework:** Angular (Modular hybrid)
- **UI Components:** Angular Material
- **Reactive Programming:** RxJS (Observables, forkJoin, switchMap)
- **Testing:** Jasmine & Karma (>60% Code Coverage)
- **Styling:** CSS3
- **Deployment:** Netlify

---

## 💻 Getting Started (Local Setup)

1. **Clone & Install:**

```bash
   git clone https://github.com/sadsotti/ntt4cities.git
   cd ntt4cities
   npm install
```

2. **Auth Setup:** Generate a token at [GoRest Login](https://gorest.co.in/)

3. **Run Development Server:**

```bash
   ng serve
```

4. **Access:** Visit `http://localhost:4200/` and log in with your token

---

## 🧪 Testing

The project includes a robust testing suite to ensure reliability.

- **Run All Tests:** `ng test`
- **Check Coverage:** `ng test --code-coverage`

---

## 🔗 Useful Links

- [start2impact](https://www.start2impact.it/)
- [My LinkedIn](https://linkedin.com/in/lorenzo-sottile)

---

