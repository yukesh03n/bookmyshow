# 🎬 Book My Show - MERN Stack Project

A full-stack movie ticket booking application built with **MERN Stack** (MongoDB, Express.js, React.js, Node.js). Users can register, book tickets, and receive e-tickets via email. Partners can add theaters and shows, while Admin manages movies and approvals.

---

## 🛠 Features

### **Customer**

* Register and login with **JWT authentication**.
* Forget password via **email OTP**.
* Browse movies and shows.
* Book seats and make payments.
* Receive **e-ticket via email**.

### **Partner**

* Login as a partner.
* Add theaters.
* Add shows for movies.

### **Admin**

* Add new movies.
* Approve or block theaters added by partners.

---

## 🌐 Live Demo

Check out the live app deployed on Render:

[Book My Show - Live Demo](https://bookmyshow-3oi0.onrender.com)

---

## 🔑 Test Credentials

You can use the following accounts to test the app:

### Customer

* Email: `jana@gmail.com`
* Password: `customer123`

### Partner

* Email: `pooja@gmail.com`
* Password: `partner123`

### Admin

* Email: `yukesh@gmail.com`
* Password: `admin123`

---

## 💻 Tech Stack

* **Frontend:** React.js, Material-UI, Redux
* **Backend:** Node.js, Express.js
* **Database:** MongoDB (Mongoose ODM)
* **Authentication:** JWT (JSON Web Tokens)
* **Email Service:** SendGrid
* **Payment Integration:** Stripe

---

## 📂 Project Structure

### Backend

```
backend/
│
├── controllers/        # Logic for routes
├── models/             # MongoDB models
├── routes/             # API routes
├── middleware/         # Auth & error handling
├── utils/              # Email & payment helpers
├── server.js           # Entry point
└── config/             # Database connection
```

### Frontend

```
frontend/
│
├── src/
│   ├── components/     # Reusable components
│   ├── pages/          # Page views
│   ├── Redux/          # Redux
│   ├── api/            # API calls
│   ├── App.js
│   └── index.js
```

---

## ⚙ Installation

1. **Clone the repository**

```bash
git clone https://github.com/yukesh03n/bookmyshow.git
cd bookmyshow
```

2. **Install dependencies**

```bash
# Backend
cd server
npm install

# Frontend
cd ../client
npm install
```

3. **Environment Variables**
   Create a `.env` file in the backend:

```
DB_URL=your_mongodb_uri
JWT_SECRET=your_jwt_secret
STRIPE_KEY=your_stripe_key
SENDGRID_API_KEY=your_sendgrid_api_key
```

4. **Run the project**

```bash
# Backend
cd server
node server.js

# Frontend
cd client
npm start
```

---

## 🔑 Features & Highlights

* Role-based access: Customer, Partner, Admin
* Secure authentication with JWT
* Email OTP for password reset
* E-ticket delivery via email
* Admin approval workflow for theaters
* Payment integration ready

## 👨‍💻 Author

**Yukesh N**
