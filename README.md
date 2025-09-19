# Kindred Take-Home Project: Pet Swapping Mini-App

Welcome! Thank you for taking the time to complete our take-home challenge.
This is meant to simulate a real (but lighthearted) Kindred product experience, with a twist: instead of homes, you'll be helping people find pet-sitting buddies!

## Project Brief

You'll extend a minimal experience for browsing and "booking" pets available for swapping/sitting. The goal is to showcase your frontend skills, your technical and product thinking, and your ability to communicate clearly.

You'll find boilerplate already in place for simple feed of pets - your task is to improve on what is there and make it your own. That might mean showing off your UI/UX skills and improving the existing feed, adding a new feature or screen, or even simply improving the organization and structure of the project. There's no right answer here, just an opportunity to show us your skills and what you are passionate about.

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
- Do not copy-paste full, unedited AI-generated screens or logic that you can not explain yourself.

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

# Eddy's take home assignment

**Total time spent**: 2 hours, 2 min

## Approach

- When I started the project, I had noticed that Tailwind was not working, and the test suites were failing to run. My first steps were to fix that by updating tailwind, adding the types for jest and changing the jest config to use `babel-jest` instead of `ts-jest`. While I was at it I also update Next and React to the latest versions.

- After that, I reorganized the directory. This was for organization purposes only, as I think that it is easier to understand a Next project when your source files are in a `src` directory.

- My next steps were to make sure that all of the tests passed. I noticed that there were 2 tests failing in the `PetCard.test.tsx` file. Both around the booking feature.

  - I set up the booking feature using the current implementation which allowed for the pet to be booked.
  - I then installed Shadcn and used the `sonner` component to display a toast message when the pet was booked.
    - I decided to use Shadcn for speed, I didnt want to spend too much time on simple UI components, and knew that I could get the aesthetic I wanted with Shadcn.
    - If I had more time, I would like to add a loading state to the "Book now" button to show that something is happening.

- After having all of the tests pass, I moved the `Navigation` to the `layout` component. This not only allowed for more simple consistency going forward, but also allowed the `Navigation` to be server rendered without needing to change the whole `page` component to a server component.

  - I also added a simple `PageTitle` component here to again be more consistent between states.
  - I had also planned to make each pet its own details page if I had time, and would have been able to use the `PageTitle` component there as well.

- Next I worked on giving the `PetCard` a new look. While I dont think that there was anything wrong with the initial one, I wanted to give the project a little bit of a more personal look and feel. I used the [Browse](https://livekindred.com/browse/all-destinations) page as inspiration, with a few ideas that I had while working on the app.

  - During this work, I used the `yarn workspace web test:watch` command to make sure that any tests that broke due to my work were fixed.
  - I also added new tests related to displaying the correct icon for a pet.

- After that I wanted to add a feature that I hoped was unique, I used [Nuqs](https://nuqs.dev/) to allow filtering of pets.

  - I added hardcoded filters for species and to only show available pets
  - I stored the filters state in the URL, so that filtered URLs could be sharable. Example http://localhost:3000/?showAvailable=true

- Finally, as I was doing cleanup, I realized that I forgot to send the `POST` request as directed, so I added that final feature.
  - In this, I did notice that I was getting a 404 on a `POST` request, but was able to send a `PATCH` that updated the database.

## AI Usage

For this, I felt like it was a pretty simple project and I didn't really use AI too much other than using the tab completion in Cursor. Here are the areas that I did use AI for and why:

- Testing the **Book Now** feature. I used AI to quickly remind myself how to test the `sonner` component from Shadcn
- Tests for the `PetFilters` component. I found that I was running out of time and asked Cursor to write me a set of unit tests for the `PetFilters` component. From there I removed all of the tests that I found useless, and cleaned up the other tests to ensure that they were in fact testing what I wanted.

## If I had more time

Here are a list of things that I would like to do if I had more time:

- Loading state on the button to show that something is happening when you hit "Book Now"
- Empty state for if you filter yourself down to 0 pets
- Come up with a nicer design for the filters.
- I wanted to move the fetch call to the server and have everything other then the "Book Now" button server rendered
- I wanted to create each pet it's own details page
