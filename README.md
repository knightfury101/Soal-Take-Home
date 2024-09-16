# Soal Take Home Assessment

## By Aditya Singh Rajput

This is Full-Stack ToDo app built using TypeScript, JavaScript, ExpressJS for the backend and NextJS for the frontend. For database, I've used MongoDB and for authentication/authorization I've used JWT tokens.

## Features

- User can register and log into their account.
- User can create many ToDos, and they can set the date by when they've to complete it.
- User can also set the priority of the ToDo.
- User can edit and delete the Todo.
- User can filter the ToDo based on completion, pending and overdue.
- User can see total number of ToDo.

## Installation

### Backend

- Navigate in this folder.
- First create `.env` file in the root of the backend folder.
- Populate this `.env` file with the following:

```
MONGO_URI=mongodb+srv://adityasingh99:M9H6wD3GDlwpXsK9@todo-soal.6uwdp.mongodb.net/?retryWrites=true&w=majority&appName=todo-soal
PORT=8000
CLIENT_URL=http://localhost:3000
JWT_SECRET=kjasho7ayfpaiuohcp989uh
```

- Open terminal and run the command `npm start`

### Frontend

- Navigate in this folder.
- Open terminal and run `npm run dev`

## Implementation of V2

- I would build an AI Chat Bot so that user can ask it about ToDos.
- It would also go through all the ToDos and filter and sort the ToDos according the deadline and priority.
- I would also add a calendar so that user can look at all the ToDos right there in the calendar and they can organize their work easily.

Here is the Loom Link for the Demo: [Demo](https://www.loom.com/share/5121a16591a04259a60a63540943e86d?sid=42641473-4f90-4ef0-ae54-b958612dee68)
