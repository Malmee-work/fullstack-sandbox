import * as React from "react";
import { getTodoLists } from "../data";

const TodoListsContext = React.createContext({
  todoLists: [],
  setTodoLists: Function,
});

export const TodoListsProvider = ({ children }) => {
  const [todoLists, setTodoLists] = React.useState();

  React.useEffect(() => {
    const fetchData = async () => {
      const todoLists = await getTodoLists();
      setTodoLists(todoLists || []);
    };
    fetchData();
  }, []);
  return (
    <TodoListsContext.Provider value={{ todoLists, setTodoLists }}>
      {children}
    </TodoListsContext.Provider>
  );
};

export const useTodoLists = () => {
  const context = React.useContext(TodoListsContext);

  // force hook to be used within todo list provider
  if (context === undefined) {
    throw new Error("useTodoLists must be used within a TodoListsProvider");
  }
  return context;
};
