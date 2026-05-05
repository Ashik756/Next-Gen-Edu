# Next Gen Edu

A SaaS-based Learning Management System (LMS) built for teachers and students in Bangladesh.

---

## Tech Stack

- **Frontend & Backend**: Next.js 15 (App Router, JavaScript)
- **Database**: MongoDB + Mongoose
- **Authentication**: NextAuth.js (Email/Password + Google OAuth)
- **UI**: Shadcn UI + Tailwind CSS
- **Video Hosting**: YouTube Embed (Unlisted)
- **PDF Notes**: Google Drive Links

---

## Features

### Admin
- Platform analytics (users, teachers, students, courses)
- Teacher application approve/reject
- User management with role control
- Course management with featured toggle

### Teacher
- Create, edit, delete, and publish courses
- Curriculum builder: Subject → Chapter → Class
- Add YouTube videos + Google Drive PDFs per class
- Track student enrollments

### Student
- Browse and enroll in courses
- Course player with progress tracking
- Access PDF notes
- Profile management

### Public
- Landing page with featured courses
- Course listing with search and filters
- Course details with curriculum preview
- Teacher application page

---

## Project Structure

```bash
src/
├── app/
│   ├── (auth)/          # Login, Register
│   ├── (public)/        # Landing, Courses, Teach
│   ├── (admin)/         # Admin Dashboard
│   ├── (teacher)/       # Teacher Dashboard
│   ├── (student)/       # Student Dashboard
│   └── api/             # API Routes
│
├── components/
│   ├── ui/              # Shadcn Components
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── Logo.jsx
│   ├── SessionWrapper.js
│   ├── DashboardSidebar.jsx
│   ├── DashboardLayout.jsx
│   └── sidebar-config.js
│
├── lib/
│   ├── db.js            # MongoDB Connection
│   └── auth.js          # NextAuth Config
│
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

## Getting Started

### 1. Clone the repository

```bash
<<<<<<< HEAD
git clone https://github.com/Ashik756/Next-Gen-Edu
=======
git clone https://github.com/Ashik756/Next-Gen-Edu.git
>>>>>>> e78a0f6 (Home page edited)
cd Next-Gen-Edu
```

### 2. Install dependencies

```bash
npm install
```

### 3. Setup environment variables

Create `.env.local`

```env
MONGODB_URI=mongodb://localhost:27017/lms
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-random-secret-key
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
ADMIN_EMAILS=youremail@gmail.com
```

### 4. Run development server

```bash
npm run dev
```

Open:

```bash
http://localhost:3000
```

---

## User Roles

| Role | Access Method |
|------|---------------|
| Admin | Add email to `ADMIN_EMAILS` |
| Teacher | Apply via teacher application |
| Student | Default after registration |

---

## Course Structure

```bash
Course
└── Subject
    └── Chapter
        └── Class
            ├── YouTube Video
            └── Google Drive PDF
```

Example:

```bash
Physics
└── Motion
    └── Class 1
        ├── Video Lecture
        └── PDF Notes
```

---

## Business Model

- Teachers pay monthly or yearly subscription
- Students purchase courses from teachers
- Platform revenue comes from teacher subscriptions

---

## Deployment

### Deploy to :contentReference[oaicite:0]{index=0}

```bash
npm install -g vercel
vercel --prod
```

Set environment variables:

```env
MONGODB_URI
NEXTAUTH_URL
NEXTAUTH_SECRET
GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET
ADMIN_EMAILS
```

---

## Google OAuth Setup

1. Go to :contentReference[oaicite:1]{index=1} Cloud Console
2. Create a new project
3. Create OAuth credentials
4. Add redirect URIs:

```bash
http://localhost:3000/api/auth/callback/google
https://yourdomain.com/api/auth/callback/google
```

---

## Upcoming Features

- Payment gateway (SSLCommerz / bKash)
- Password reset via email
- Email notifications
- Live classes
- Course reviews and ratings
- Certificate generation
- Mobile app

---

## License

<<<<<<< HEAD
MIT License
=======
MIT License
>>>>>>> e78a0f6 (Home page edited)
