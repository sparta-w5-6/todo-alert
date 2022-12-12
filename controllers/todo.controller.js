const express = require('express');
const { Todos, Users, Likes } = require('../models');
const TodoService = require('../services/todo.service');

class TodoController {
  constructor() {
    this.TodoService = new TodoService();
  }
  createTodo = async (req, res) => {
    try {
      const { title, item, isDone } = req.body;
      const { userId } = res.locals.user;

      const todo = await this.TodoService.createTodo({
        title,
        item,
        isDone,
        userId,
      });
      res.status(201).json({ result: todo });
    } catch (error) {
      console.error(error);
      res.status(400).json({ errorMessage: error.message });
    }
  };

  updateTodo = async (req, res) => {
    try {
      const { todoId } = req.params;
      const { title, item } = req.body;
      const { userId } = res.locals.user;

      // trouble shooting
      // 인자 순서 맞춥시다......
      const update = await this.TodoService.updateTodo(
        todoId,
        title,
        item,
        userId,
      );
      console.log('update controller: ', update);

      res.status(201).json({ result: update });
    } catch (error) {
      console.error(error);
      res.status(400).json({ errorMessage: error.message });
    }
  };
}

module.exports = TodoController;
