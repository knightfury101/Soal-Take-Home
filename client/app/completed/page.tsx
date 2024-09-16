"use client";
import { useTodos } from "@/context/todoContext";
import useRedirect from "@/hooks/useUserRedirect";

import { Todo } from "@/utils/types";
import { filteredTodos } from "@/utils/utilities";
import TodoItem from "../Components/TodoItem/TodoItem";
import Filters from "../Components/Filters/Filters";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { container, item } from "@/utils/animations";

export default function Home() {
  useRedirect("/login");

  const { openModalForAdd, priority, completedTodos, setPriority } = useTodos();

  const filtered = filteredTodos(completedTodos, priority);

  useEffect(() => {
    setPriority("all");
  }, []);

  return (
    <main className="m-6 h-full">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Completed Todos</h1>
        <Filters />
      </div>

      <motion.div
        className="pb-[2rem] mt-6 grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-[1.5rem]"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {filtered.map((todo: Todo, i: number) => (
          <TodoItem key={i} todo={todo} />
        ))}
        <motion.button
          className="h-[16rem] w-full py-2 rounded-md text-lg font-medium text-gray-500 border-dashed border-2 border-gray-400
          hover:bg-gray-300 hover:border-none transition duration-200 ease-in-out"
          onClick={openModalForAdd}
          variants={item}
        >
          Add New Todo
        </motion.button>
      </motion.div>
    </main>
  );
}
