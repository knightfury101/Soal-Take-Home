"use client";
import React from "react";
import { UserContextProvider } from "../context/userContext";
import { TodosProvider } from "@/context/todoContext";

interface Props {
  children: React.ReactNode;
}

function UserProvider({ children }: Props) {
  return (
    <UserContextProvider>
      <TodosProvider>{children}</TodosProvider>
    </UserContextProvider>
  );
}

export default UserProvider;
