# 🛒 NextCart — Modern E-Commerce App (Next.js + Firebase + MongoDB)

NextCart is a simple, elegant, and fully functional e-commerce demo application built using the **Next.js App Router**, **Firebase Authentication**, and **MongoDB (Mongoose)**.  
This project is created as part of **Programming Hero – Early Job Placement (EJP-12), Task 5**.

The application includes a polished UI, full authentication, protected dashboard pages, product CRUD operations, and a responsive landing page with 7+ sections.

---

## 🚀 Live Demo  
👉 [(https://next-cart-ejp-project.vercel.app/)]

## 📦 GitHub Repository  
👉 [(https://github.com/mdtajrianrashid/NextCart-EJP-Project)]

---

# 📌 Features Overview

## 🌐 Public Pages  
- **Landing Page (7 Sections)**  
  - Hero Section  
  - Features  
  - Trending Products  
  - Why Choose Us  
  - Testimonials  
  - Navbar & Footer  
- **All Products Page** with search + priority filter  
- **Product Details Page**

## 🔐 Authentication (Firebase Auth)  
- Email + Password Registration  
- Login Page  
- **Google Login (required by assignment)**  
- Persistent session using cookies  
- Logout functionality  

## 🔒 Protected Dashboard Pages (Middleware Protected)  
- **Add Product**  
  - Title, short description, full description  
  - Price, priority, optional image  
  - Date selector  
  - Success toast & redirect  
- **Manage Products**  
  - View products as table/grid  
  - Delete products  
  - View product details  
  - Clean, responsive layout  

## 🗄️ Backend & API  
Built using **Next.js API Routes** with MongoDB:

- `GET /api/products` → fetch all products  
- `POST /api/products` → create product  
- `GET /api/products/:id` → fetch single product  
- `DELETE /api/products/:id` → delete product  

## 🎨 UI / UX  
- Fully responsive  
- Tailwind CSS  
- Clean component structure  
- Micro animations using **Framer Motion**  
- Card hover effects  
- Line clamping, shadows, spacing  

---

# 🏗️ Tech Stack

| Layer | Technology |
|-------|-------------|
| Frontend | Next.js (App Router) |
| Authentication | Firebase Auth |
| Backend | Next.js API Routes |
| Database | MongoDB + Mongoose |
| Styling | Tailwind CSS |
| Animations | Framer Motion |
| State Handling | React Hooks |
| Deployment | Vercel (Client), MongoDB Atlas |

---

# 📁 Project Structure

```
nextcart/
│
├── app/
│   ├── layout.js
│   ├── page.js
│   ├── notfound.jsx
│   ├── error.jsx
│   ├── loading.jsx
│   │
│   ├── login/
│   │   └── page.jsx
│   │
│   ├── register/
│   │   └── page.jsx
│   │
│   ├── products/
│   │   ├── page.jsx
│   │   └── [id]/
│   │       └── page.jsx
│   │
│   ├── dashboard/
│   │   ├── addproduct/
│   │   │   └── page.jsx
│   │   └── manageproducts/
│   │       └── page.jsx
│   │
│   ├── api/
│   │   └── products/
│   │       ├── route.js
│   │       └── [id]/
│   │           └── route.js
│
├── components/
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── ProductCard.jsx
│   ├── LoadingSpinner.jsx
│   ├── ProtectedRoute.jsx
│   └── FormInput.jsx
│
├── lib/
│   ├── firebase.js
│   ├── db.js
│   └── auth.js
│
├── models/
│   └── Product.js
│
├── public/
│   └── placeholder.png
│
├── middleware.js
├── .env.local
├── package.json
├── tailwind.config.js
└── README.md
```

---

# ⚙️ Installation & Setup

## 1️⃣ Clone the Repository

```bash
git clone https://github.com/mdtajrianrashid/NextCart-EJP-Project.git
cd NextCart-EJP-Project
```

## 2️⃣ Install Dependencies

```bash
npm install
```

## 3️⃣ Environment Variables

Create a file:

```
.env.local
```

Add:

```env
MONGODB_URI=your_mongodb_connection_string

# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=your_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

## 4️⃣ Run the Project

```bash
npm run dev
```

App will run on:  
👉 http://localhost:3000

---

# 🔐 Dashboard Route Protection (middleware.js)

This project uses **middleware.js** to protect all `/dashboard/*` routes.

If a user is not authenticated, they are redirected to:  
👉 `/login`

Sessions are handled via cookies after Firebase login.

---

# 🌟 Features Implemented According to Task Requirements

✔ Next.js App Router  
✔ 7-section landing page  
✔ Product list page  
✔ Product details page  
✔ Protected Add Product page  
✔ Protected Manage Products page  
✔ Firebase Authentication  
✔ Google login option  
✔ MongoDB database  
✔ CRUD operations  
✔ Clean UI & animations  
✔ Fully responsive  
✔ Deploy-ready project  

---

# 🎉 Thank You!