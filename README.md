# Kindred Take-Home Project: Pet Swapping Mini-App

Welcome! Thank you for taking the time to complete our take-home challenge.
This is meant to simulate a real (but lighthearted) Kindred product experience, with a twist: instead of homes, you'll be helping people find pet-sitting buddies!

## Project Brief

You'll extend a minimal experience for browsing and "booking" pets available for swapping/sitting. The goal is to showcase your frontend skills, your technical and product thinking, and your ability to communicate clearly.

---

## Time Expectations

- **You should not spend more than 1-2 hours on this project.**
- Please don't over-engineer or polish beyond that.
- If you run over, just note what you'd do with more time in your submission.

---

## Requirements

### **Functional**

1. **Pet List**

   - Fetch a list of pets from the mock API (`GET /api/pets`).
   - Display pet info: photo, name, species, city, and status.
   - Indicate if the pet is "booked" or "available."

2. **Booking Action**

   - Allow users to "Book" an available pet.
   - Simulate booking with `POST /api/book/:petId` (just fake the call and update UI).

---

## About Using AI

- You **may use AI/code assistants** to help you, but _you_ should own and understand all code.
- Please note in your submission if/where you used AI to assist.
- Do not copy-paste full, unedited AI-generated screens or logic that you can not explain yourelf.

---

## What to Submit

- Push your code to your assignment repo.
- **Update this README** with:

  - Your approach and any tradeoffs.
  - Time spent.
  - Where/if you used AI.
  - (If needed) What you'd do with more time.

- Optional: You may submit a screenshare walkthrough of your code if you'd prefer.

---

## Getting Started

### **Install dependencies**

```bash
yarn install
# or
npm install
```

### **Start the mock API**

```bash
cd mock-api
yarn start
# or
npm start
```

This starts the JSON server at `http://localhost:3001`.

### **Run the Web App**

```bash
cd web
yarn dev
# or
npm run dev
```

---

**Thanks and have fun with it!**
If you get stuck or have questions, don't hesitate to reach out to your recruiter.
