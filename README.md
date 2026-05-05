````markdown
# Next Gen Edu

A SaaS-based Learning Management System (LMS) built for teachers and students in Bangladesh.

## Tech Stack

- **Frontend & Backend** — Next.js 15 (App Router, no TypeScript)
- **Database** — MongoDB + Mongoose
- **Authentication** — NextAuth.js (Email/Password + Google OAuth)
- **UI** — Shadcn UI + Tailwind CSS
- **Video** — YouTube Embed (unlisted)
- **PDF** — Google Drive Links

## Features

**Admin**
- Platform analytics (users, teachers, students, courses)
- Teacher application approve/reject
- User management with role control
- Course management with featured toggle

**Teacher**
- Course create, edit, delete, publish
- Curriculum builder — Subject → Chapter → Class
- YouTube video + Google Drive PDF per class
- Student enrollment tracking

**Student**
- Browse and enroll in courses
- Course player with progress tracking
- PDF notes access
- Profile management

**Public**
- Landing page with featured courses
- Course listing with search and filters
- Course detail with curriculum preview
- Teacher application page

## Project Structure

```
src/
├── app/
│   ├── (auth)/           Login, Register
│   ├── (public)/         Landing, Courses, Teach
│   ├── (admin)/          Admin Dashboard
│   ├── (teacher)/        Teacher Dashboard
│   ├── (student)/        Student Dashboard
│   └── api/              API Routes
├── components/
│   ├── ui/               Shadcn Components
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── Logo.jsx
│   ├── SessionWrapper.js
│   ├── DashboardSidebar.jsx
│   ├── DashboardLayout.jsx
│   └── sidebar-config.js
├── lib/
│   ├── db.js             MongoDB Connection
│   └── auth.js           NextAuth Config
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

## Getting Started

**1. Clone the repository**

```bash
git clone https://github.com/yourusername/next-gen-edu.git
cd next-gen-edu
```

**2. Install dependencies**

```bash
npm install
```

**3. Set up environment variables**

```bash
cp .env.example .env.local
```

Edit `.env.local` with your values:

```env
MONGODB_URI=mongodb://localhost:27017/lms
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-random-secret-key
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
ADMIN_EMAILS=youremail@gmail.com
```

**4. Run the development server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## User Roles

| Role | How to get |
|------|------------|
| Admin | Add email to `ADMIN_EMAILS` in `.env.local` |
| Teacher | Apply via footer link → Admin approves |
| Student | Default role after registration |

## Course Structure

```
Course
└── Subject        e.g. Physics, Math
     └── Chapter   e.g. Chapter 1 - Motion
          └── Class
               ├── YouTube Video (unlisted)
               └── Google Drive PDF
```

## Business Model

- Teachers pay a monthly or yearly subscription to use the platform
- Students buy courses directly from teachers
- Platform earns from teacher subscriptions only

## Deployment

**Deploy to Vercel**

```bash
npm install -g vercel
vercel --prod
```

Add these environment variables in Vercel dashboard:

```
MONGODB_URI
NEXTAUTH_URL
NEXTAUTH_SECRET
GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET
ADMIN_EMAILS
```

## Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project
3. Create OAuth 2.0 credentials
4. Add authorized redirect URIs:

```
http://localhost:3000/api/auth/callback/google
https://yourdomain.com/api/auth/callback/google
```

## Upcoming Features

- Payment gateway (SSLCommerz / bKash)
- Password reset via email
- Email notifications
- Live class
- Course reviews and ratings
- Certificate generation
- Mobile app

## License

MIT License
````

---
