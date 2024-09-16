import { useTodos } from "@/context/todoContext";
import { edit, star, trash } from "@/utils/Icons";
import { Todo } from "@/utils/types";
import { formatTime } from "@/utils/utilities";
import React from "react";
import { motion } from "framer-motion";
import { item } from "@/utils/animations";
import { Edit, Star, Trash2 } from "lucide-react";

interface TodoItemProps {
  todo: Todo;
}

function TodoItem({ todo }: TodoItemProps) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "low":
        return "text-green-500";
      case "medium":
        return "text-yellow-500";
      case "high":
        return "text-red-500";
      default:
        return "text-red-500";
    }
  };

  const { getTodo, openModalForEdit, deleteTodo, modalMode } = useTodos();

  return (
    <motion.div
      className="h-[16rem] px-4 py-3 flex flex-col gap-4 shadow-sm bg-[#f9f9f9] rounded-lg border-2 border-white"
      variants={item}
    >
      <div>
        <h4 className="font-bold text-2xl">{todo.title}</h4>
        <p>{todo.description}</p>
      </div>
      <div className="mt-auto flex justify-between items-center">
        <p className="text-sm text-gray-400">{formatTime(todo.createdAt)}</p>
        <p className={`text-sm font-bold ${getPriorityColor(todo.priority)}`}>
          {todo.priority}
        </p>
        <div>
          <div className="flex items-center gap-3 text-gray-400 text-[1.2rem]">
            <button
              className={`${
                todo.completed
                  ? "text-yellow-400 fill-yellow-400"
                  : "text-gray-400"
              }`}
            >
              <Star className="h-6 w-6 fill-current" />
            </button>
            <button
              className="text-[#00A1F1]"
              onClick={() => {
                getTodo(todo._id);
                openModalForEdit(todo);
              }}
            >
              <Edit className="h-6 w-6 " />
            </button>
            <button
              className="text-[#F65314]"
              onClick={() => {
                deleteTodo(todo._id);
              }}
            >
              <Trash2 className="h-6 w-6 " />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default TodoItem;
