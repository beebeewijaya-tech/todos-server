const { AuthenticationError } = require("apollo-server-errors");
const ulid = require("ulid");
const { hashPassword, comparePassword } = require("../../utils/password");
const { signToken } = require("../../utils/token");

const Mutation = {
  registerUser: async (_parent, args, { dataSources }) => {
    const { user } = args;
    const id = `${ulid.ulid()}-${ulid.ulid()}`;
    const hashedPassword = await hashPassword(user.password);
    const userData = {
      id,
      ...user,
      password: hashedPassword,
    };
    await dataSources.db.insertUser(userData);
    return userData;
  },
  loginUser: async (_parent, args, { dataSources }) => {
    const { user } = args;
    const userData = await dataSources.db.getUserByEmail(user.email);
    if (!userData) throw new AuthenticationError("User doesn't exist");

    const isUserPassword = await comparePassword(
      user.password,
      userData.password
    );
    if (!isUserPassword) throw new AuthenticationError("Incorrect Password");

    const userResponse = { ...userData };
    const generateToken = await signToken(userResponse);

    return {
      ...userResponse,
      token: generateToken,
    };
  },
  addTodo: async (_parent, args, { dataSources, authUser }) => {
    const { todo } = args;
    const id = `${ulid.ulid()}-${ulid.ulid()}`;
    const todoInput = {
      ...todo,
      id,
      author: authUser.id,
    };
    await dataSources.db.insertTodo(todoInput);

    return todoInput;
  },
  updateTodo: async (_parent, args, { dataSources }) => {
    const { id, todo } = args;

    await dataSources.db.updateTodo(id, todo);

    return {
      id,
      ...todo,
    };
  },
  deleteTodo: async (_parent, args, { dataSources }) => {
    const { id } = args;

    await dataSources.db.deleteTodo(id);

    return id;
  },
  deleteCompletedTodo: async (_parent, _args, { dataSources, authUser }) => {
    await dataSources.db.deleteCompletedTodo(authUser.id);
    return true;
  },
};

module.exports = Mutation;
