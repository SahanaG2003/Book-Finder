# 📚 Book Finder

Book Finder is a React-based web app that allows users to search for books using the [Open Library API](https://openlibrary.org/developers/api).  
It provides features like saving books, creating a personal learning list, tracking recent searches, viewing ratings, and pagination.  

Live Demo 👉 [Findubook on Netlify](https://findubook.netlify.app)

---

## ✨ Features

- 🔍 **Book Search** – Search books by title using the Open Library API.  
- ⭐ **Save Books** – Add books to a "Saved" list for later reference.  
- 📖 **Learning List** – Move books from Saved into a dedicated learning list.  
- ⏱ **Recent Searches** – Quickly re-run your last 5 searches.  
- ⭐ **Ratings Integration** – Fetch and display average ratings for books.  
- 📑 **Pagination & Load More** – Easily browse through multiple pages of results.  
- 🎨 **Responsive UI** – Mobile-friendly sidebar and adaptive grid layout.  
- 💾 **Local Storage** – Saved books, learning list, and searches persist across sessions.  

---

## 🖥️ Tech Stack

- **React.js** – UI and state management  
- **Open Library API** – Book search & ratings data  
- **CSS (custom)** – Styling and responsiveness  
- **LocalStorage** – Persistent data storage  

---

## 📂 Project Structure

book_finder/
│── public/ # Static files (images, favicon, etc.)
│── src/
│ ├── App.js # Main React component
│ ├── App.css # Stylesheet
│ ├── index.js # React entry point
│ └── components/ # (Optional) Future components
│── package.json # Dependencies & scripts
│── README.md # Project documentation

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment
Deployment on Netlify

Push project to GitHub.

Go to Netlify
, click New Site from Git.

Select your repo and configure:

Branch to deploy: main

Build command: npm run build

Publish directory: build

Deploy → Your app will be live!

Already live at: https://findubook.netlify.app

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

Future Enhancements

## Add categories/genres for better browsing

User authentication with cloud storage

PWA support for offline use

Voice-based book search

Contributing

Fork the project

Create a new branch (feature/your-feature)

Commit your changes

Push the branch and create a Pull Request
