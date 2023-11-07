# Frontend Noodling with React

This project is an exploration into React along with frontend design techniques and JavaScript animation libraries. It serves as a playground to test, learn, and experiment with web technologies.

## Structure

- The main application is set up using [Create React App](https://reactjs.org/docs/create-a-new-react-app.html#create-react-app).
- Animations can be integrated using libraries like [GSAP](https://greensock.com/gsap/) and [AOS](https://michalsnik.github.io/aos/).
- You'll want to override the environment variables in your own .env (which you'll need to create as it is not commited in the repo here)

## Getting Started

1. **Navigate to the Project Directory:**
cd frontendnoodling

2. **Install Dependencies:**
npm install

3. **Start the Development Server:**
npm start

4. **Run a build:**
npm run build

5. **Deploy a build:**
npm run deploy #note this requires further setup of your own


This will open a browser window pointing to `http://localhost:3000/` displaying the app.

## Exploration and Development

- `src/App.js`: This is the main component file. Start your journey here.
- To integrate animations, consider adding GSAP or AOS as mentioned above.
- Style your components using either plain CSS or SCSS (after setting up SCSS).

## Future Improvements

- [ ] Fix spacing issue on BBCIntro cursor that has returned.
- [ ] Remove horizontal scrollbar on AudioControl hide to right.
- [ ] Trigger hide AudioControl on BBCIntro y or n selection.
- [ ] Fix trigger not working to hide AudioControl if a BBCIntro y or n selection has been made.
- [ ] Integrate React Router for multi-page functionality.
- [ ] If above, integrate logo, header nav and audiocontrol into it
- [ ] Explore more advanced animations and transitions.
- [ ] Add state management solutions if complexity increases.

## About the components

- [BBC Micro Model B](https://artsandculture.google.com/asset/bbc-micro-model-b-acorn-computer-company/PgFx5X_lPpjhOg).

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

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

# License
This code is provided under the MIT License. See the LICENSE file for details.

Please make sure to handle sensitive information, such as emails and authentication codes, securely and according to best practices to protect your users' data and privacy. It is your responsibility to enforce data protection rules in accordance with the laws of each country.
