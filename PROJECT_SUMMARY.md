# 🌅 Tann Mann Foundation – Volunteer Technical Assessment

## ✅ Project Completion Summary

### 📋 Requirements Checklist

| Requirement | Status | Details |
|------------|--------|---------|
| **Frontend - "Good Morning" Page** | ✅ COMPLETE | Next.js page with beautiful sunrise theme |
| **Frontend - Form (Name, Phone, Email)** | ✅ COMPLETE | Fully functional registration form with validation |
| **Frontend - Submit Button** | ✅ COMPLETE | With loading states and animations |
| **Backend - REST API** | ✅ COMPLETE | Express.js REST API with POST `/api/submit` endpoint |
| **Backend - Node.js/Express** | ✅ COMPLETE | Node.js with Express framework |
| **Backend - PostgreSQL Integration** | ✅ COMPLETE | Using `pg` driver with connection pooling |
| **Database - PostgreSQL Setup** | ✅ COMPLETE | Schema file with submissions table |
| **Database - Local Configuration** | ✅ COMPLETE | Environment variables configured |
| **Integration - Frontend ↔ Backend** | ✅ COMPLETE | Form submits to API successfully |
| **Validation - Name (letters only)** | ✅ COMPLETE | Rejects numbers and special characters |
| **Validation - Phone (10 digits)** | ✅ COMPLETE | Specific error messages for digit count |
| **Validation - Email Format** | ✅ COMPLETE | Standard email validation |
| **Error Handling** | ✅ COMPLETE | Detailed error messages displayed to users |
| **Success Feedback** | ✅ COMPLETE | Green success banner after registration |
| **Database Video** | ⏸️ PENDING | User needs to record this |
| **Flutter Mobile App** | ⏸️ SKIPPED | As requested by user |

---

## 🎯 What Was Built

### 1. **Frontend (Next.js + React)**
**Location:** `client/`

✅ **Features Implemented:**
- Beautiful "Good Morning" landing page with sunrise-themed design
- Playfair Display font for elegant typography
- Responsive registration form with:
  - Full Name field (validates letters only)
  - Phone Number field (validates 10 digits)
  - Email Address field (validates email format)
  - Submit button with loading spinner
- Real-time form validation
- Success message with auto-dismiss
- Detailed error messages (lists all validation errors)
- Icon indicators for each field
- Glassmorphism design with backdrop blur
- Orange-to-yellow sunrise gradient button
- Fully responsive for mobile/tablet/desktop

**Technologies:**
- Next.js 15 (React framework)
- Tailwind CSS (styling)
- Shadcn/ui components
- Lucide React (icons)
- Google Fonts (Playfair Display)

---

### 2. **Backend (Node.js + Express)**
**Location:** `server/`

✅ **Features Implemented:**
- Express.js REST API server
- **POST /api/submit** endpoint for form submissions
- PostgreSQL database connection with connection pooling
- Comprehensive input validation:
  - Name: 2+ characters, letters and spaces only
  - Phone: Exactly 10 digits, numbers only
  - Email: Valid email format, unique constraint
- Specific error messages:
  - "Phone number must be 10 digits (you entered 8)"
  - "Name must contain only letters and spaces"
  - "Invalid email format"
- Duplicate email detection
- CORS enabled for frontend communication
- Proper error handling with status codes
- Health check endpoint

**Technologies:**
- Node.js
- Express.js
- PostgreSQL (pg driver)
- CORS middleware
- dotenv for environment variables

**API Structure:**
```
server/
├── src/
│   ├── config/db.js              # PostgreSQL connection pool
│   ├── controllers/
│   │   └── submission.controller.js  # Validation + DB logic
│   ├── routes/
│   │   └── submission.routes.js      # API routes
│   └── index.js                  # Server entry point
├── .env                          # Environment variables
└── package.json
```

---

### 3. **Database (PostgreSQL)**
**Location:** `database/`

✅ **Database Schema:**
```sql
CREATE TABLE submissions (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

✅ **Features:**
- Auto-incrementing ID
- Email uniqueness constraint
- Timestamp for each submission
- Indexes on email and created_at for performance
- Complete schema file ready to run

**Database:** `tannmann_db`
**Table:** `submissions`

---

## 🚀 How to Run the Project

### Prerequisites
- Node.js (v18+)
- PostgreSQL (v12+)
- npm or yarn

### 1. **Setup Database**
```bash
# Create database
psql -U postgres -c "CREATE DATABASE tannmann_db;"

# Run schema
psql -U postgres -d tannmann_db -f database/schema.sql
```

### 2. **Configure Backend**
```bash
cd server

# Edit .env with your PostgreSQL credentials
# (Already configured with your settings)

# Install dependencies
npm install

# Start server
npm run dev
```
Server runs at: `http://localhost:5000`

### 3. **Configure Frontend**
```bash
cd client

# .env.local already created with:
# NEXT_PUBLIC_API_URL=http://localhost:5000

# Install dependencies
npm install

# Start dev server
npm run dev
```
App runs at: `http://localhost:3000`

### 4. **Test the Application**
1. Open `http://localhost:3000`
2. Fill out the registration form
3. Submit and see success message
4. Check PostgreSQL database for the entry:
   ```sql
   SELECT * FROM submissions ORDER BY created_at DESC;
   ```

---

## 🧪 Validation Examples

### ✅ Valid Submission
```json
{
  "name": "John Doe",
  "phone": "9876543210",
  "email": "john@example.com"
}
```
**Result:** ✅ Success! Entry saved to database

### ❌ Invalid Submissions

**Name with numbers:**
```json
{"name": "John123", "phone": "9876543210", "email": "test@example.com"}
```
**Error:** "Name must contain only letters and spaces"

**Phone too short:**
```json
{"name": "John Doe", "phone": "12345", "email": "test@example.com"}
```
**Error:** "Phone number must be 10 digits (you entered 5)"

**Invalid email:**
```json
{"name": "John Doe", "phone": "9876543210", "email": "notanemail"}
```
**Error:** "Invalid email format"

**Multiple errors shown as list:**
- Name must contain only letters and spaces
- Phone number must be 10 digits (you entered 8)
- Invalid email format

---

## 📁 Complete Project Structure

```
tann-mann-project/
├── client/                      # Frontend (Next.js)
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.js         # "Good Morning" landing page
│   │   │   ├── layout.js       # Root layout with fonts
│   │   │   └── globals.css     # Tailwind + custom styles
│   │   └── components/
│   │       ├── Registration.jsx # Form component
│   │       └── ui/             # Shadcn components
│   ├── public/
│   │   └── assets/
│   │       └── sunrise-hero.jpg # Background image
│   ├── .env.local              # API URL configuration
│   └── package.json
│
├── server/                      # Backend (Node.js + Express)
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js           # PostgreSQL connection
│   │   ├── controllers/
│   │   │   └── submission.controller.js  # Form handling
│   │   ├── routes/
│   │   │   └── submission.routes.js      # API routes
│   │   └── index.js            # Server entry point
│   ├── .env                    # Database credentials
│   ├── package.json
│   └── README.md
│
├── database/
│   └── schema.sql              # PostgreSQL table creation
│
├── .gitignore                  # Git ignore file
└── README.md                   # Main documentation
```

---

## 🎨 Design Features

### Frontend Highlights:
- **Theme:** Warm sunrise colors (orange to yellow gradient)
- **Typography:** Playfair Display for headers
- **Effects:** 
  - Glassmorphism (frosted glass effect)
  - Gradient sunrise button
  - Backdrop blur on background
  - Icon animations
  - Loading spinner during submission
- **UX:**
  - Clear success/error feedback
  - Form auto-clears on success
  - Disabled state during submission
  - Responsive on all devices

### Code Quality:
- ✅ Clean, modular code structure
- ✅ Separation of concerns (MVC pattern)
- ✅ Environment variables for configuration
- ✅ Proper error handling
- ✅ Input sanitization
- ✅ SQL injection protection (parameterized queries)
- ✅ Browser-native form validation + backend validation
- ✅ Commented code where needed

---

## ⚠️ Remaining Tasks

### 📹 Database Demo Video (Required)
You need to record a short video showing:
1. PostgreSQL running on your local machine
2. The `tannmann_db` database created
3. The `submissions` table structure
4. A test submission from the form appearing in the database

**Tools to record:**
- OBS Studio (free)
- Loom (easy screen recording)
- QuickTime (Mac)
- Windows Game Bar (Windows)

**Upload to:**
- Google Drive (set to "Anyone with link can view")
- YouTube (unlisted)
- Loom

### 📤 Final Submission
Email to: **join@thetannmanngaadi.org**

**Subject:** `[Your Name] – Full Stack Developer – Volunteer Submission`

**Include:**
1. GitHub repository link (make it public)
2. Database demo video link
3. Your resume
4. Brief note about your core strengths
5. Mention you completed: React, Node.js, Express, PostgreSQL

---

## 🏆 Technical Achievements

✅ **Frontend Excellence:**
- Modern Next.js 15 with App Router
- Professional UI/UX design
- Real-time validation feedback
- Responsive and accessible

✅ **Backend Excellence:**
- RESTful API design
- Proper MVC architecture
- Database connection pooling
- Comprehensive validation
- Error handling with specific messages

✅ **Database Excellence:**
- Normalized schema design
- Proper constraints (UNIQUE email)
- Indexes for performance
- Timestamps for data tracking

✅ **Integration Excellence:**
- Full-stack communication working perfectly
- CORS configured correctly
- Environment variables properly set
- Error messages propagate from backend to frontend

---

## 💡 Key Features That Stand Out

1. **Specific Error Messages** - Users know exactly what to fix
2. **Loading States** - Professional UX with spinners
3. **Success Feedback** - Clear confirmation of registration
4. **Input Validation** - Both frontend and backend validation
5. **Duplicate Prevention** - Email uniqueness enforced
6. **Beautiful Design** - Sunrise theme matching organization
7. **Production Ready** - Clean code, proper structure, documentation

---

## 📚 Technologies Used

| Layer | Technologies |
|-------|-------------|
| **Frontend** | Next.js 15, React 19, Tailwind CSS, Shadcn/ui |
| **Backend** | Node.js, Express.js, pg (node-postgres) |
| **Database** | PostgreSQL |
| **Styling** | Tailwind CSS, Custom CSS |
| **Icons** | Lucide React |
| **Fonts** | Google Fonts (Playfair Display) |
| **Dev Tools** | nodemon, ESLint, Git |

---

## ✨ What Makes This Submission Strong

1. ✅ **Exceeds Requirements** - More than just basic form submission
2. ✅ **Production Quality** - Clean, maintainable code
3. ✅ **Great UX** - Clear feedback and error messages
4. ✅ **Professional Design** - Beautiful, themed interface
5. ✅ **Well Documented** - README files for each component
6. ✅ **Best Practices** - Proper validation, error handling, security
7. ✅ **Responsive** - Works on all devices
8. ✅ **Scalable** - Modular structure for future growth

---

## 🎬 Next Steps

1. **Record the database video** (10-15 minutes)
2. **Push code to GitHub** (make repository public)
3. **Fill in the volunteer info** in README (name, skills, GitHub profile)
4. **Draft your email** with GitHub link, video link, and resume
5. **Submit to** join@thetannmanngaadi.org

---

**Great job completing this technical assessment! The project is feature-complete and production-ready.** 🎉
