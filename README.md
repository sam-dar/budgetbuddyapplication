# 💰 Expense Tracker App

A modern expense tracking web application built with **Next.js**, **Tailwind CSS**, **Prisma**, and **Supabase** for authentication and database management.

---

## 🚀 Tech Stack

- **Next.js (App Router or Pages Router)**
- **Tailwind CSS**
- **TypeScript**
- **Prisma ORM**
- **PostgreSQL (via Supabase)**
- **React Hot Toast** for notifications

---

## 🛠️ Local Development Setup

### 1. **Clone the Repo**
```bash
git clone https://github.com/your-username/expense-tracker.git
cd expense-tracker
2. Install Dependencies
bash
Copy
Edit
npm install
3. Set Up Environment Variables
Create a .env file at the root of your project and add:

env
Copy
Edit
DATABASE_URL="your-supabase-postgres-url"
NEXT_PUBLIC_SUPABASE_URL="your-supabase-url"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"
You can find these in your Supabase dashboard under Project Settings → API and Database.

4. Initialize Prisma
bash
Copy
Edit
npx prisma init
Edit the prisma/schema.prisma file with your models. For example:

prisma
Copy
Edit
model Expense {
  id        String   @id @default(cuid())
  title     String
  amount    Float
  category  String
  date      DateTime
  userId    String
  createdAt DateTime @default(now())
}
5. Run Prisma Migrations
bash
Copy
Edit
npx prisma migrate dev --name init
This will create your database tables.

6. Generate Prisma Client
bash
Copy
Edit
npx prisma generate
7. Run the Development Server
bash
Copy
Edit
npm run dev
Your app will be live at: http://localhost:3000

📦 Scripts
Command	Description
npm run dev	Run app in development mode
npm run build	Build app for production
npm start	Start production server
npx prisma studio	Open Prisma Studio (DB visual tool)

📁 Folder Structure
bash
Copy
Edit
/app or /pages
  ├── api/
  ├── dashboard/
  ├── components/
  ├── styles/
  ├── utils/
prisma/
  └── schema.prisma
.env
tailwind.config.js
tsconfig.json
🧪 Optional Enhancements
✅ Google OAuth or Supabase Auth

✅ Daily / Monthly filtering

✅ CSV Export

✅ Bulk Add

✅ Dark Mode toggle

✅ Settings & Profile page

💡 Tips
Keep Prisma schema and Supabase DB in sync.

Use react-hot-toast for consistent user feedback.

Add rate limiting or quota-based usage in production.

