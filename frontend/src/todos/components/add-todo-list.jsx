import React, { useState } from "react";

import {
  Box,
  Button,
  Card,
  CardContent,
  CardActions,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

import { addTodoList } from "../../data";
import { useTodoLists } from "../todo-list-provider";

const useStyles = makeStyles({
  card: {
    margin: "1rem",
  },
  todoLine: {
    display: "flex",
    alignItems: "center",
  },
  textField: {
    flexGrow: 1,
  },
  standardSpace: {
    margin: "8px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
  },
});

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  outline: 0,
};

export const AddToDoList = ({ open, handleClose }) => {
  const classes = useStyles();
  const [title, setTitle] = useState("");
  const { todoLists, setTodoLists } = useTodoLists();

  const addList = async () => {
    const result = await addTodoList({ title: title });
    setTodoLists([...todoLists, result]);
    handleClose();
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Card className={classes.card}>
          <CardContent>
            <Typography component="h2">Add Todo List</Typography>
            <TextField
              label="Title of the todo list"
              value={title}
              onChange={(event) => {
                setTitle(event.target.value);
              }}
              className={classes.textField}
            />
            <CardActions>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                onClick={addList}
                disabled={!title}
              >
                Save
              </Button>
            </CardActions>
          </CardContent>
        </Card>
      </Box>
    </Modal>
  );
};
