# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
My EMS
Step 1: Setup React Project
npx create-react-app emsui
cd emsui
code .
npm start

npm install react-router-dom
Step 2: Create Navbar in App component
App.js
import { BrowserRouter, Link } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/home">Home</Link>
      </nav>
    </BrowserRouter>
  );
}
export default App;
Step 3: Create Home Components in src folder
Home.js
const Home = () => {
  return (
    <div>
      <h1>Home Page</h1>
      <p>Welcome to the Home page!</p>
    </div>
  );
};
export default Home;
Step 4: Add Link in App component
App.js
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./Home";

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/home">Home</Link>
      </nav>
        <Routes>
          <Route path="/home" element={<Home />} />
        </Routes>
    </BrowserRouter>
  );
}
export default App;
Step 5: Create About Component and add link in App Component
About.js
const About = () => {
  return (
    <div>
      <h1>About Page</h1>
      <p>This is the About page of the website.</p>
    </div>
  );
};
export default About;
Step 6: Create Country Component and add link in App Component
Country.js
const Country = () => {
  return (
    <div>
      <h1>Manage Country</h1>
    </div>
  );
};
export default Country;
Step 7: Create State Component and add link in App Component
State.js
const State = () => {
  return (
    <div>
      <h1>Manage State</h1>
    </div>
  );
};
export default State;
Step 8: Create District Component and add link in App Component
District.js
const District = () => {
  return (
    <div>
      <h1>Manage District</h1>
    </div>
  );
};
export default District;
