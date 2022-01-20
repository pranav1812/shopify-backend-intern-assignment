# Shopify Internship Backend Assignment 2022

### Bonus feature implemented: Confirmation while deletion and ability to undo a deletion

## To run the application locally:

### Requirements:
1. NPM and Node.JS installed (I used v14)
2. Mongo DB installed on system <PORT: 27017>
3. Mongo DB Compass (not necessary)
4. PORT 5000 and 3000 should be free

### Steps:
1. Clone this repository.
2. ```cd shopify-intern-assignment```
3. ```cd backend```
4. Install dependencies with ```npm install```
5. Install nodemon globally with ```npm i -g nodemon```
6. Create a .env file:
* Add the following in it:
```
    PORT= 5000
    MONGOOSE_URL = "mongodb://localhost:27017/shopify-assignment"
```
7. Run the backend with ```nodemon src/index.js```
8. In a separate terminal, cd into the frontend folder in the root of the project.
9. Clone the frontend repository with
```
    git clone https://github.com/pranav1812/shopify-assignment-basic_frontend.git
```
10. cd into the newly cloned directory
11. Install Dependencies with ``` npm install```
12. Run the frontend with ```npm start```
### OR Instead of Running the Frontend
8. Refer to this Postman collection
<https://www.getpostman.com/collections/235870473f2340917ea1>

#### Prefer using Postman as Fronend might not be working fine.

#### Please raise an issue if there are any doubts regarding setting up process or project in general