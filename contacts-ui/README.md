# Customer Contacts UI

## This is UI project for customer contacts with following frameworks/technologies
- ReactJS 18
- Typescript 4
- react-bootstrap (for grid layout)
- CSS
- HTML
- NodeJs

## Key features of the application are as below
- Responsive and elegant UI
- Dynamic data loading
- Rest API connectivity
- Pagination
- Error handling

## Improvements
- 

## Available Scripts
After checking out the poject, you can run following commands in project directory:

### `npm install`
To install all the dependencies
### `npm start`
To start the local server

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm run build`
Builds the app for production to the `build` folder

**This steps only loads dummy data due to below code for rendering only UI module to run the full application please start springboot server from rest_api project first!!**

`catch((error) => {
      console.log(error);
      setContactList(dummyContacts as any)});`

*Link to run spriing boot project is as [readme]{https://github.com/malhar016/local_KN/tree/master/README.md}*
