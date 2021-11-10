import React, { Fragment, useState } from "react";

import { Receipt as ReceiptIcon, Add as AddIcon } from "@mui/icons-material";
import {
  Button,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Typography,
} from "@mui/material";

import { ToDoListForm } from "./todo-list-form";
import { AddToDoList } from "./add-todo-list";
import { useTodoLists } from "../todo-list-provider";

export const ToDoLists = ({ style }) => {
  const { todoLists } = useTodoLists();
  const [activeList, setActiveList] = useState();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Fragment>
      {open ? <AddToDoList open={open} handleClose={handleClose} /> : null}
      <Button type="button" color="primary" onClick={handleOpen}>
        Add Todo List <AddIcon />
      </Button>
      {todoLists && todoLists.length ? (
        <Card style={style}>
          <CardContent>
            <Typography component="h2">My Todo Lists</Typography>
            <List>
              {todoLists.map((item) => (
                <ListItem key={item.id} button onClick={() => setActiveList(item)}>
                  <ListItemIcon>
                    <ReceiptIcon />
                  </ListItemIcon>
                  <ListItemText primary={item.title} />
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      ) : null}
      {activeList && (
        <ToDoListForm
          // use key to make React recreate component to reset internal state
          toDoList={activeList}
          key={activeList.id}
        />
      )}
    </Fragment>
  );
};
