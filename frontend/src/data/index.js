import client from "../utils/fetch-client";

const addTodoList = async (item) => {
  return client("list", "POST", item);
};

const getTodoLists = async () => {
  return client("list", "GET");
};

const updateTodoList = async (id, todoList) => {
  return client(`list/${id}`, "POST", todoList);
};

export { addTodoList, getTodoLists, updateTodoList };
