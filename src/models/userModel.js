const users = [
  { id: 1, name: "Alice", email: "alice@example.com", password: "alice123" },
  { id: 2, name: "Bob", email: "bob@example.com", password: "bob123" },
  { id: 3, name: "Carol", email: "carol@example.com", password: "carol123" }
];

function getAllUsers() {
  return users;
}

function getUserByEmail(email) {
  return users.find((user) => user.email === email);
}

function addUser({ name, email, password }) {
  const newUser = {
    id: users.length + 1,
    name,
    email,
    password
  };

  users.push(newUser);
  return newUser;
}

module.exports = {
  getAllUsers,
  getUserByEmail,
  addUser
};
