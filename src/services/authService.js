const jwt = require("jsonwebtoken");
const { getUserByEmail, addUser } = require("../models/userModel");

const JWT_SECRET = "simple-secret-key";

function register({ name, email, password }) {
  const existingUser = getUserByEmail(email);

  if (existingUser) {
    return { error: "User already exists." };
  }

  const user = addUser({ name, email, password });
  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email
    }
  };
}

function login({ email, password }) {
  const user = getUserByEmail(email);

  if (!user || user.password !== password) {
    return { error: "Invalid email or password." };
  }

  const token = jwt.sign(
    { userId: user.id, email: user.email, name: user.name },
    JWT_SECRET,
    { expiresIn: "1h" }
  );

  return { token };
}

module.exports = {
  JWT_SECRET,
  register,
  login
};
