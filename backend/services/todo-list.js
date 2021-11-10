const todoList = [];
let id = 0;
async function createTodoList(req, res) {
  if (req.body) {
    const listItem = { id, title: req.body.title, todos: [], checked: false };
    todoList.push(listItem);
    id++;
    return res.status(200).send(listItem);
  }
  return res.status(500).send({ reason: "Error in creating todo list" });
}

async function getToDoLists(req, res) {
  return res.status(200).send(todoList);
}

async function updateTodoList(req, res) {
  if (req.params.id) {
    const listItemIndex = todoList.findIndex(
      (item) => item.id === Number(req.params.id)
    );
    if (listItemIndex > -1) {
      todoList[listItemIndex] = req.body;
    }
    return res.status(200).send([true, "Todo list updated"]);
  }
  return res.status(500).send({ reason: "Error in updateing todo list" });
}

module.exports = {
  createTodoList,
  getToDoLists,
  updateTodoList,
};
