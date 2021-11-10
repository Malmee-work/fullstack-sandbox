import React, { Component } from "react";
import "./App.css";
import { Typography, AppBar, Toolbar } from "@mui/material";
import { ToDoLists } from "./todos/components/todo-lists";
import { TodoListsProvider } from "./todos/todo-list-provider";

const MainAppBar = () => {
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" color="inherit">
          Things to do
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

const mainWrapperStyle = { display: "flex", flexDirection: "column" };
const centerContentWrapper = { display: "flex", justifyContent: "center" };
const contentWrapperStyle = {
  display: "flex",
  flexDirection: "column",
  maxWidth: "80rem",
  flexGrow: 1,
};
const MainWrapper = ({ children }) => {
  return (
    <div style={mainWrapperStyle}>
      <MainAppBar />
      <div style={centerContentWrapper}>
        <div style={contentWrapperStyle}>{children}</div>
      </div>
    </div>
  );
};

class App extends Component {
  render() {
    return (
      <MainWrapper>
        <TodoListsProvider>
          <ToDoLists style={{ margin: "1rem" }} />
        </TodoListsProvider>
      </MainWrapper>
    );
  }
}

export default App;
