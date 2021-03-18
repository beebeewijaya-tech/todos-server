const { SQLDataSource } = require("datasource-sql");

const MINUTE = 60;

class Database extends SQLDataSource {
  getAllTodos(page) {
    return this.knex("todos").select("*").limit(20);
  }

  getAllTodosCount() {
    return this.knex("todos").count("id").first();
  }

  insertTodo(todo) {
    return this.knex("todos").insert(todo);
  }

  updateTodo(id, todo) {
    return this.knex("todos").where({ id }).update(todo);
  }

  deleteTodo(id) {
    return this.knex("todos").where({ id }).del();
  }

  deleteCompletedTodo(author) {
    return this.knex("todos").where({ author, isCompleted: true }).del();
  }

  insertUser(user) {
    return this.knex("users").insert(user);
  }

  getUserByEmail(email) {
    return this.knex("users").where({ email }).first().cache(MINUTE);
  }
}

module.exports = Database;
