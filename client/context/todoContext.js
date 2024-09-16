import axios from "axios";
import React, { createContext, useEffect } from "react";
import { useUserContext } from "./userContext";
import toast from "react-hot-toast";

const TodosContext = createContext();

const serverUrl = "http://localhost:8000/api/v1";

export const TodosProvider = ({ children }) => {
  const userId = useUserContext().user._id;

  const [todos, setTodos] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [todo, setTodo] = React.useState({});

  const [isEditing, setIsEditing] = React.useState(false);
  const [priority, setPriority] = React.useState("all");
  const [activeTodo, setActiveTodo] = React.useState(null);
  const [modalMode, setModalMode] = React.useState("");
  const [profileModal, setProfileModal] = React.useState(false);

  const openModalForAdd = () => {
    setModalMode("add");
    setIsEditing(true);
    setTodo({});
  };

  const openModalForEdit = (todo) => {
    setModalMode("edit");
    setIsEditing(true);
    setActiveTodo(todo);
  };

  const openProfileModal = () => {
    setProfileModal(true);
  };

  const closeModal = () => {
    setIsEditing(false);
    setProfileModal(false);
    setModalMode("");
    setActiveTodo(null);
    setTodo({});
  };

  // get todos
  const getTodos = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${serverUrl}/todos`);

      setTodos(response.data.todos);
    } catch (error) {
      console.log("Error getting todos", error);
    }
    setLoading(false);
  };

  // get todo
  const getTodo = async (todoId) => {
    setLoading(true);
    try {
      const response = await axios.get(`${serverUrl}/todo/${todoId}`);

      setTodo(response.data);
    } catch (error) {
      console.log("Error getting todo", error);
    }
    setLoading(false);
  };

  const createTodo = async (todo) => {
    setLoading(true);
    try {
      const res = await axios.post(`${serverUrl}/todo/create`, todo);

      console.log("Todo created", res.data);

      setTodos([...todos, res.data]);
      toast.success("Todo created successfully");
    } catch (error) {
      console.log("Error creating todo", error);
    }
    setLoading(false);
  };

  const updateTodo = async (todo) => {
    setLoading(true);
    try {
      const res = await axios.patch(`${serverUrl}/todo/${todo._id}`, todo);

      // update the todo in the todos array
      const newTodos = todos.map((tsk) => {
        return tsk._id === res.data._id ? res.data : tsk;
      });

      toast.success("Todo updated successfully");

      setTodos(newTodos);
    } catch (error) {
      console.log("Error updating todo", error);
    }
  };

  const deleteTodo = async (todoId) => {
    setLoading(true);
    try {
      await axios.delete(`${serverUrl}/todo/${todoId}`);

      // remove the todo from the todos array
      const newTodos = todos.filter((tsk) => tsk._id !== todoId);

      setTodos(newTodos);
    } catch (error) {
      console.log("Error deleting todo", error);
    }
  };

  const handleInput = (name) => (e) => {
    if (name === "setTodo") {
      setTodo(e);
    } else {
      setTodo({ ...todo, [name]: e.target.value });
    }
  };

  // get completed todos
  const completedTodos = todos.filter((todo) => todo.completed);

  // get pending todos
  const activeTodos = todos.filter((todo) => !todo.completed);

  useEffect(() => {
    getTodos();
  }, [userId]);

  console.log("Active todos", activeTodos);

  return (
    <TodosContext.Provider
      value={{
        todos,
        loading,
        todo,
        todos,
        getTodo,
        createTodo,
        updateTodo,
        deleteTodo,
        priority,
        setPriority,
        handleInput,
        isEditing,
        setIsEditing,
        openModalForAdd,
        openModalForEdit,
        activeTodo,
        closeModal,
        modalMode,
        openProfileModal,
        activeTodos,
        completedTodos,
        profileModal,
      }}
    >
      {children}
    </TodosContext.Provider>
  );
};

export const useTodos = () => {
  return React.useContext(TodosContext);
};
