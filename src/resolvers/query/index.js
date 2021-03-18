const { AuthenticationError } = require("apollo-server-errors");

const Query = {
  getAllTodos: async (_parent, _args, { dataSources, authUser }) => {
    if (!authUser) throw new AuthenticationError('Not Authorized')

    const todos = await dataSources.db.getAllTodos()
    const todosTotalResponse = await dataSources.db.getAllTodosCount()
    const todosTotal = todosTotalResponse['count(`id`)']
    const response = {
      todos,
      total: todosTotal
    }
    return response
  },
};

module.exports = Query;
