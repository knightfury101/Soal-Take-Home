import moment from "moment";
import { Todo } from "./types";

export const formatTime = (createdAt: string) => {
  const now = moment();
  const created = moment(createdAt);

  // if the todo was created today
  if (created.isSame(now, "day")) {
    return "Today";
  }

  // if the todo was created yesterday
  if (created.isSame(now.subtract(1, "days"), "day")) {
    return "Yesterday";
  }

  // check if created with the last 7 days
  if (created.isAfter(moment().subtract(6, "days"))) {
    return created.fromNow();
  }

  // if item was created within the last 4 weeks (up to 1 month ago)
  if (created.isAfter(moment().subtract(3, "weeks"), "week")) {
    return created.fromNow();
  }

  return created.format("DD/MM/YYYY");
};

export const filteredTodos = (todos: Todo[], priority: string) => {
  const filteredTodos = () => {
    switch (priority) {
      case "low":
        return todos.filter((todo) => todo.priority === "low");
      case "medium":
        return todos.filter((todo) => todo.priority === "medium");
      case "high":
        return todos.filter((todo) => todo.priority === "high");
      default:
        return todos;
    }
  };

  return filteredTodos();
};

export const overdueTodos = (todos: Todo[]) => {
  const todayDate = moment();

  // filter todos that are not completed and the due date is before today
  return todos.filter((todo) => {
    return !todo.completed && moment(todo.dueDate).isBefore(todayDate);
  });
};
