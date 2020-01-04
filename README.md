## Breast Cancer Decision Aid

This is a decision aid for young women with cancer to help them decide what type of surgery options are right for them. The tool is composed of the following sections: 

* **Treatment options** - provides information about each surgery option
* **Treatment comparison** - a table comparing aspects of each surgery option
* **What is important to you** - list of values the user can rate from a scale of 0-10
* **How are you feeling** - a basic anxiety scale assessment where a user rates her level of anxiety
* **Next steps** - list of surgery options the user can decide from with a decisoin tree to follow-up questions
* **Summary** - end of the decision aid which summarizes user responses and includes option to print summary

Although no user data is stored, the decision aid includes a simple user authentication system with a corresponding database that stores username, password, whether or not the user is elgible for a lumpectomy, and whether or not the user is an Administrator.

### Front-end
All font-end work in **src** folder

#### File structure
* src/index.js: app entry point. Wraps main App.js component in React Router's BrowserRouter component, initializes Google Analytics tracking, renders components using ReactDOM.render.
* src/App.js: main application file. Imports all top-level components and creates routes for each, arranges major formatting components, initializes misc settings.
* src/helpers: modules with frequently used code to be imported by app components.
* src/components: contains all parent and child components responsible for app funcionality.
* src/components/layout: stateless components responsible for layout
* src/components/accordions: stateless Accordion components for accordion ui functionality.

#### Libraries used:
* React
* Bootstrap 4

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

### Back-end
All back-end work in api folder

Technologies required:
* PHP 7.2
* MySQL
