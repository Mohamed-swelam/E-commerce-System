# 🛒 CST E-Commerce Platform

A fully front-end E-Commerce web application built using **HTML, CSS, and Vanilla JavaScript**.
The project simulates a real-world online shopping experience with separate customer, seller, and admin workflows using modular structure and local JSON data.

---

## 📌 Project Overview

CST E-Commerce Platform is a multi-page web application that mimics the functionality of a complete online shopping system.

It includes:

* Customer browsing and shopping experience
* Cart & Checkout system
* Wishlist functionality
* Customer account management
* Admin dashboard
* Seller management
* Order & Ticket handling
* Modular UI components (Navbar & Footer)

The project uses **dummy JSON data** to simulate backend functionality, making it ideal for learning frontend architecture and application logic without relying on server-side technologies.

---

## 🧰 Tech Stack

### 🔹 Frontend

* HTML5
* CSS3
* Vanilla JavaScript (ES6)

### 🔹 Data Storage

* Local JSON files (Dummy Data)
* LocalStorage (for state persistence)

### 🔹 Architecture Style

* Modular JavaScript structure
* Component-based layout loading
* Role-based UI structure (Admin / Customer / Seller)

---

## 🏗 Architecture

The project follows a **feature-based folder structure**, where each major feature has its own HTML, CSS, and JS files.

### Architectural Characteristics:

* 📦 Feature-based separation (Cart, Checkout, Admin, etc.)
* 🧩 Reusable UI Components (Navbar & Footer)
* 📁 Dummy JSON data to simulate API/backend
* 🧠 Business logic separated into dedicated JS files
* 🔄 Client-side state management using LocalStorage
* 👥 Role-based access logic (Admin / Customer / Seller)

### High-Level Flow

1. User browses products
2. Adds items to Cart or Wishlist
3. Proceeds to Checkout
4. Order stored in dummy data
5. Admin can manage products, users, orders, and tickets

---

## ✨ Features

### 🏠 Home & Product Browsing

* View all products
* Browse by category
* Product details page
* Responsive UI

### 🛍 Cart System

* Add to cart
* Remove from cart
* Update quantities
* Persistent cart using LocalStorage

### ❤️ Wishlist

* Add/remove items
* Dedicated wishlist page

### 💳 Checkout

* Order summary
* Customer info validation
* Order confirmation simulation

### 👤 Customer Panel

* View orders
* Manage wishlist
* Logout functionality

### 🛠 Admin Dashboard

* Manage customers
* Manage sellers
* Manage products
* Manage orders
* Manage support tickets
* Form validation logic

### 📩 Contact & Support

* Contact form
* Ticket simulation

### 🔐 Authentication UI

* Login page
* Role-based UI handling (simulated)

---

## 🧪 Testing

Since the project is frontend-only:

* ✅ Manual testing for UI workflows
* ✅ Form validation testing
* ✅ LocalStorage behavior testing
* ✅ Cart & Checkout flow verification
* ✅ Admin dashboard CRUD simulations

Future improvements may include:

* Unit testing with Jest
* Integration testing
* End-to-end testing with Cypress

---

## 📁 Folder Structure

```bash
CST_Project/
│
├── About/
├── Admin/
├── Cart/
├── Checkout/
├── Components/
├── ContactUs/
├── customerinfo/
├── Dummy Data/
├── GeneralFunctions/
├── HomePage&Products/
├── login/
├── product_details/
├── imgs/
│
└── .vscode/
```

### Key Directories Explained

| Folder               | Purpose                                  |
| -------------------- | ---------------------------------------- |
| `Admin/`             | Admin dashboard logic & management pages |
| `Cart/`              | Cart functionality                       |
| `Checkout/`          | Checkout process                         |
| `Components/`        | Reusable Navbar & Footer                 |
| `Dummy Data/`        | JSON files simulating backend database   |
| `GeneralFunctions/`  | Shared utility functions                 |
| `HomePage&Products/` | Home page & product listing              |
| `customerinfo/`      | Customer dashboard                       |
| `login/`             | Login UI                                 |
| `product_details/`   | Product details page                     |

---

## 🚀 How to Run the Project

### Option 1: Run Locally (Recommended)

1. Download or clone the repository:

   ```bash
   git clone <repository-url>
   ```

2. Open the project folder.

3. Use Live Server (VS Code recommended):

   * Install Live Server extension
   * Right-click `home.html`
   * Select **"Open with Live Server"**

---

## 🔮 Future Improvements

Here are some potential enhancements:

### 🔹 Backend Integration

* Replace dummy JSON with real API
* Use .NET 
* Connect to MongoDB / MySQL

### 🔹 Authentication

* Real authentication system (JWT)
* Role-based route protection

### 🔹 Code Improvements

* Convert to ES Modules
* Use MVC structure
* Improve state management

### 🔹 Framework Migration

* Migrate to Angular
* Use component-based SPA architecture

### 🔹 UI Enhancements

* Improve responsiveness
* Add animations
* Enhance accessibility (ARIA support)

### 🔹 Testing

* Add Jest unit tests
* Add Cypress end-to-end tests

---

## 🤝 Contribution

This project is structured clearly and modularly, making it easy to extend and improve.

Feel free to:

* Improve UI/UX
* Refactor logic
* Integrate a real backend
* Add new features


---

# ⭐ Final Notes

This project demonstrates:

* Strong frontend structure
* Feature-based organization
* Business logic separation
* Multi-role application simulation
* Real-world E-Commerce workflow modeling

It is a solid foundation for evolving into a full-stack production-ready system.

---

