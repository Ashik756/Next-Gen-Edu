```markdown
# 🎓 Next Gen Edu — LMS SaaS Platform

A full-featured Learning Management System (LMS) built as a SaaS platform for teachers and students in Bangladesh.

---

## 🚀 Tech Stack

| Technology | Purpose |
|------------|---------|
| Next.js 15 (App Router) | Frontend + Backend |
| MongoDB + Mongoose | Database |
| NextAuth.js | Authentication |
| Shadcn UI + Tailwind CSS | UI Components |
| YouTube Embed | Video Hosting |
| Google Drive Links | PDF Resources |

---

## ✨ Features

### 🔐 Authentication
- Email/Password login (Gmail only)
- Google OAuth login
- Role-based access control (Admin, Teacher, Student)
- Protected routes via middleware

### 👨‍💼 Admin Dashboard
- Platform analytics (users, teachers, students, courses)
- Teacher application management (approve/reject)
- User management with role control
- Course management with featured toggle

### 👨‍🏫 Teacher Dashboard
- Course CRUD (create, edit, delete, publish)
- Curriculum builder (Subject → Chapter → Class)
- YouTube video + Google Drive PDF per class
- Student enrollment tracking
- Subscription status management

### 👨‍🎓 Student Dashboard
- Browse and enroll in courses
- Course player with YouTube embed
- PDF notes download
- Progress tracking (mark complete)
- Profile management

### 🌐 Public Pages
- Landing page with featured courses
- Course listing with filters (category, free/paid, search)
- Course detail page with curriculum preview
- Teacher application page

---

```markdown
## 📁 Project Structure

```
src/
├── app/
│   ├── (auth)/          → Login, Register
│   ├── (public)/        → Landing, Courses, Teach
│   ├── (admin)/         → Admin Dashboard
│   ├── (teacher)/       → Teacher Dashboard
│   ├── (student)/       → Student Dashboard
│   └── api/             → API Routes
├── components/
│   ├── ui/              → Shadcn Components
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── Logo.jsx
│   ├── SessionWrapper.js
│   ├── ConditionalNavbar.jsx
│   ├── ConditionalFooter.jsx
│   ├── ConditionalMain.jsx
│   ├── DashboardSidebar.jsx
│   ├── DashboardLayout.jsx
│   └── sidebar-config.js
├── lib/
│   ├── db.js            → MongoDB Connection
│   └── auth.js          → NextAuth Config
└── models/
    ├── User.js
    ├── Course.js
    ├── Subject.js
    ├── Chapter.js
    ├── Class.js
    ├── Enrollment.js
    ├── Subscription.js
    ├── Payment.js
    └── TeacherApplication.js
```

---

## ⚙️ Environment Variables

`.env.local` ফাইল তৈরি করো:

```env
# MongoDB
MONGODB_URI=mongodb://localhost:27017/lms

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-random-secret-key

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Admin
ADMIN_EMAILS=admin@gmail.com,admin2@gmail.com
```

---

## 🛠️ Installation

```bash
# Clone করো
git clone https://github.com/yourusername/next-gen-edu.git
cd next-gen-edu

# Dependencies install করো
npm install

# Environment variables set করো
cp .env.example .env.local
# .env.local এ নিজের values দাও

# Dev server চালাও
npm run dev
```

---

## 🗄️ Database Setup

**Local MongoDB:**
```
MONGODB_URI=mongodb://localhost:27017/lms
```

**MongoDB Atlas (Production):**
1. [mongodb.com/atlas](https://mongodb.com/atlas) এ account বানাও
2. Free cluster তৈরি করো
3. Connection string কপি করো
4. `.env.local` এ `MONGODB_URI` এ দাও

---

## 🔑 Google OAuth Setup

1. [Google Cloud Console](https://console.cloud.google.com) এ যাও
2. New Project তৈরি করো
3. OAuth 2.0 Credentials বানাও
4. Authorized redirect URIs এ যোগ করো:
   ```
   http://localhost:3000/api/auth/callback/google
   https://yourdomain.com/api/auth/callback/google
   ```
5. Client ID ও Secret `.env.local` এ দাও

---

## 👥 User Roles

| Role | Access | কীভাবে পাবে |
|------|--------|-------------|
| **Admin** | সব কিছু | `ADMIN_EMAILS` এ email থাকলে |
| **Teacher** | Teacher dashboard | Admin approve করলে |
| **Student** | Student dashboard | Default (register করলে) |

---

## 📚 Business Model

- **SaaS Model** — Teacher monthly/yearly subscription কিনে platform use করবে
- **Teacher Income** — Student সরাসরি course কিনবে teacher এর কাছ থেকে
- **Platform Income** — Teacher subscription fee only

---

## 🎯 Course Structure

```
Course
└── Subject (যেমন: Physics, Math)
     └── Chapter (যেমন: Chapter 1 - Motion)
          └── Class (যেমন: Class 1 - Introduction)
               ├── YouTube Video (unlisted)
               └── Google Drive PDF
```

---

## 🚢 Deploy to Vercel

```bash
# Vercel CLI install
npm install -g vercel

# Deploy
vercel

# Production deploy
vercel --prod
```

**Vercel Dashboard এ Environment Variables যোগ করো:**
- `MONGODB_URI` (MongoDB Atlas URI)
- `NEXTAUTH_URL` (https://yourdomain.com)
- `NEXTAUTH_SECRET`
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `ADMIN_EMAILS`

---

## 📋 Upcoming Features

- [ ] Payment Gateway (SSLCommerz/bKash)
- [ ] Password Reset via Email
- [ ] Email Notifications
- [ ] Live Class
- [ ] Course Reviews & Ratings
- [ ] Certificate Generation
- [ ] Mobile App

---

## 🤝 Teacher Application

Footer এ **"Teach With Us"** link এ click করে যেকেউ teacher হওয়ার জন্য apply করতে পারবে। Admin approve করলে automatically teacher role পাবে।

---

## 📄 License

MIT License — Free to use and modify.

---

## 👨‍💻 Developer

Built with ❤️ for Bangladesh's education system.
```

---