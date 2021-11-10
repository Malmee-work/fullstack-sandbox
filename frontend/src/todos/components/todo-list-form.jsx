import debounce from "lodash.debounce";
import React, { useState, useCallback } from "react";
import { formatDistanceToNow, isValid } from "date-fns";

import { makeStyles } from "@mui/styles";
import { Delete as DeleteIcon, Add as AddIcon } from "@mui/icons-material";
import {
  Button,
  Card,
  CardContent,
  CardActions,
  Checkbox,
  TextField,
  Typography,
} from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { DateTimePicker, LocalizationProvider } from "@mui/lab";

import { useTodoLists } from "../todo-list-provider";
import { updateTodoList } from "../../data";
import { useInterval } from "../../hooks/use-interval";

const useStyles = makeStyles({
  card: {
    margin: "1rem",
  },
  todoLine: {
    display: "flex",
    alignItems: "center",
    margin: "15px",
  },
  textField: {
    flexGrow: 1,
    marginRight: "5px",
  },
  daysField: {
    flexGrow: 0.1,
    marginLeft: "5px",
  },
  standardSpace: {
    margin: "8px",
  },
});

export const ToDoListForm = ({ toDoList }) => {
  const classes = useStyles();
  const [todoList, setTodoList] = useState(toDoList);
  const { todoLists, setTodoLists } = useTodoLists();
  const delay = 1000;
  const updateList = async (todoListItem) => {
    await updateTodoList(todoList.id, todoListItem);
    const lists = [...todoLists];
    const listItemIndex = lists.findIndex((item) => item.id === todoList.id);
    lists[listItemIndex] = todoListItem;
    setTodoLists(lists);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSave = useCallback(
    debounce(async (todoListItem) => {
      await updateList(todoListItem);
    }, 1000),

    []
  );

  // update the date remaining/due continuously
  useInterval(() => {
    updateDifference();
  }, delay);

  const updateDifference = () => {
    const updatedTodos = todoList.todos.map((item) => ({
      ...item,
      difference:
        item.dateForCompletion && isValid(new Date(item.dateForCompletion))
          ? formatDistanceToNow(new Date(item.dateForCompletion), {
              addSuffix: true,
            })
          : null,
    }));
    const updatedTodoList = { ...todoList, todos: updatedTodos };
    setTodoList(updatedTodoList);
  };

  const save = (updatedTodoList) => {
    if (updatedTodoList.todos.length > 0) {
      const indexOfUncheckedItem = updatedTodoList.todos.findIndex(
        (item) => item.checked === false
      );
      let allChecked;
      if (indexOfUncheckedItem === -1) {
        allChecked = true;
      } else {
        allChecked = false;
      }
      updatedTodoList.checked = allChecked;
    }
    setTodoList(updatedTodoList);
    debouncedSave(updatedTodoList);
  };

  const onAdd = () => {
    const updatedTodoList = {
      ...todoList,
      todos: [...todoList.todos, { name: "", checked: false }],
    };
    save(updatedTodoList);
  };

  const onTodoDelete = (index) => {
    const todoItems = [
      ...todoList.todos.slice(0, index),
      ...todoList.todos.slice(index + 1),
    ];
    const updatedTodoList = { ...todoList, todos: todoItems };
    save(updatedTodoList);
  };

  // on todo item check
  const onCheck = (index, item) => {
    const todoItems = [
      ...todoList.todos.slice(0, index),
      item,
      ...todoList.todos.slice(index + 1),
    ];
    const updatedTodoList = { ...todoList, todos: todoItems };
    save(updatedTodoList);
  };

  // on todo list check
  const onCheckList = (value) => {
    const updatedTodoList = { ...todoList, checked: value };
    if (todoList.todos.length > 0) {
      const todoItems = todoList.todos.map((item) => ({ ...item, checked: value }));
      updatedTodoList.todos = todoItems;
    }
    save(updatedTodoList);
  };

  const onTodoChange = (index, item) => {
    const todoItems = [
      ...todoList.todos.slice(0, index),
      item,
      ...todoList.todos.slice(index + 1),
    ];

    const updatedTodoList = { ...todoList, todos: todoItems };
    save(updatedTodoList);
  };

  const onTodoDateChange = (index, item, newValue) => {
    const formattedDate = new Date(newValue);
    const difference = formatDistanceToNow(formattedDate, { addSuffix: true });
    const newItem = { ...item, dateForCompletion: formattedDate, difference };
    onTodoChange(index, newItem);
  };

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography component="h2">
          <Checkbox
            color="default"
            checked={todoList.checked}
            onChange={() => onCheckList(!todoList.checked)}
            inputProps={{ "aria-label": "controlled" }}
          />
          {todoList.title}
        </Typography>
        {todoList.todos.map((item, index) => (
          <div key={index} className={classes.todoLine}>
            <Checkbox
              color="default"
              checked={item.checked}
              onChange={() => onCheck(index, { ...item, checked: !item.checked })}
              inputProps={{ "aria-label": "controlled" }}
            />
            <Typography className={classes.standardSpace} variant="h6">
              {index + 1}
            </Typography>
            <TextField
              label="What to do?"
              value={item.name}
              onChange={(event) =>
                onTodoChange(index, { ...item, name: event.target.value })
              }
              className={classes.textField}
            />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                renderInput={(props) => <TextField {...props} />}
                label="Date for completion"
                value={item.dateForCompletion || null}
                onChange={(newValue) => onTodoDateChange(index, item, newValue)}
              />
              <TextField
                value={item.difference || "Days remaining/due?"}
                disabled
                className={classes.daysField}
              />
            </LocalizationProvider>
            <Button
              size="small"
              color="secondary"
              className={classes.standardSpace}
              onClick={() => onTodoDelete(index)}
            >
              <DeleteIcon />
            </Button>
          </div>
        ))}
        <CardActions>
          <Button type="button" color="primary" onClick={onAdd}>
            Add Todo <AddIcon />
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  );
};
