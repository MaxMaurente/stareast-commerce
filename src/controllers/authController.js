const authService = require("../services/authService");

function register(req, res) {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ message: "name, email and password are required." });
  }

  const result = authService.register({ name, email, password });

  if (result.error) {
    return res.status(409).json({ message: result.error });
  }

  return res.status(201).json(result);
}

function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "email and password are required." });
  }

  const result = authService.login({ email, password });

  if (result.error) {
    return res.status(401).json({ message: result.error });
  }

  return res.status(200).json(result);
}

module.exports = {
  register,
  login
};
