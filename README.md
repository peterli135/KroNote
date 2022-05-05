# Data Storage Website

A website that allows you to store your important information and also edit them when needed.
- created with ReactJS and Firebase

## Website Functionality

- easily customize the theme of the website, including: font, font size, color, and background
- full CRUD operations: Create, Read, Update, and Delete data that is stored in firebase
- visually outputs the data stored in firebase via a timeline
- built in Rich Text Editor created from Draft.js with functions that support inline styles and block components.

## Demo

https://user-images.githubusercontent.com/90528127/165568091-3493695c-0d8f-48a4-a035-176e3b30aff1.mp4

## How to run locally

- Clone this project
- Run `npm install` to install the packages
- Create your own Firebase project and add that config to the [config.js file](src/Components/Firebase/config.js).
- Create 6 different collections on the Cloud Firestore Database for each of the 6 different pages. 
  - for example, family would be named "family-timeline", individual would be named "individual-timeline"
- Run `npm start` to start the server
