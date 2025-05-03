# 🎬 Movie and Series Rating & Streaming Portal – Frontend

## 🌐 Overview

This is the **Frontend** application for the **Movie and Series Rating & Streaming Portal**, a full-stack project where users can browse, rate, review, and stream movies and TV series. It also supports purchasing or renting media, social interactions (likes/comments), and admin-level media moderation. Built with **React** and modern technologies, it ensures a sleek, secure, and responsive user experience.

---

## 🚀 Features

### 👤 User Features

* **Authentication**

  * Register/Login with secure JWT-based system
  * Password reset support

* **Browse & Filter**

  * Browse by genre, rating, streaming platform, or year
  * Filter/sort by Top Rated, Most Reviewed, Recently Added, etc.

* **Review & Interact**

  * Rate titles (1–10 stars)
  * Write/edit/delete reviews (unpublished only)
  * Mark reviews with spoilers and custom tags
  * Like/unlike reviews
  * Comment on reviews with nested replies

* **Watchlist**

  * Add/remove titles from personal watchlist

* **Purchase/Rent**

  * Buy or rent movies/series
  * View purchase history

---

### 🛠 Admin Features

* **Media Library Management**

  * Add/update/delete movie or series entries
  * Metadata management (title, genres, cast, director, platform, prices, streaming links)

* **Review Moderation**

  * Approve or unpublish reviews/comments
  * Remove inappropriate content

* **Analytics Dashboard**

  * View stats on most-reviewed, top-rated titles
  * Monitor user activity and content performance

---

## 🧰 Tech Stack

| Layer        | Technology                            |
| ------------ | ------------------------------------- |
| Framework    | Nextjs (with TypeScript)            |
| Styling      | Tailwind CSS, Shadcn UI                 |
| State Mgmt   | Redux |
| Routing      | Next Router                          |
| Forms & UX   | Shadcn Form, Toast notifications  |
| Auth         | JWT (stored via HTTP-only cookies)    |
| API Requests | Axios                                 |
| Deployment   | Vercel                     |

---

## 📄 Pages & Components

### ✅ Public Pages

* **Home Page**

  * Featured, Top Rated, and Newly Added sections
  * Filter/search bar

* **All Movies/Series**

  * Grid layout with sorting & filtering options

* **Details Page**

  * Full metadata
  * Streaming, rating, review, like, comment, and purchase/rent actions

* **Authentication**

  * Login, Register, Reset Password forms

### 🔐 Protected Pages

* **Watchlist**
* **Purchase History**
* **User Reviews**
* **Admin Dashboard**

---

## 🔐 Authentication Flow

* Secure login via JWT
* Token stored in HTTP-only cookies
* Protected routes with client-side checks
* Auto-logout on token expiry

---

## 💳 Payment Flow

* Initiated from “Buy/Rent” button
* Redirect to SSLCommerz/Stripe checkout page
* On success, access link displayed and stored
* Rentals support time-limited access (enforced on backend)

---

## 📊 Admin Dashboard Features

* Approve/publish/unpublish reviews and comments
* Manage media entries with full metadata
* View aggregated stats (ratings, sales, reviews)

---

## 📦 Installation & Running Locally

```bash
git clone https://github.com/your-username/movie-streaming-frontend.git
cd movie-streaming-frontend
npm install
npm run dev
```

> Make sure the backend server is also running and CORS is correctly configured.

---

## ✅ Environment Variables

Create a `.env` file at the root with the following:

```
NEXT_PUBLIC_API_BASE_URL=
NEXT_PUBLIC_API_BACKEND_URL=
NEXT_PUBLIC_OMDB_API_KEY=
```




