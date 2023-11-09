const express = require("express");
const userRouter = express.Router();
const User = require("../models/User");
const { check, validationResult } = require("express-validator");

userRouter.use(express.json());
userRouter.use(express.urlencoded());

userRouter.get("/", async (req, res) => {
  const allUsers = await User.findAll();
  res.json(allUsers);
});

userRouter.get("/:id", async (req, res) => {
  const foundUser = await User.findByPk(req.params.id);
  res.json(foundUser);
});

userRouter.post(
  "/",
  [check("name").not().isEmpty().trim()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json({ error: errors.array() });
    } else {
      const newUser = await User.create(req.body);
      res.json(newUser);
    }
  }
);

userRouter.put("/:id", async (req, res) => {
  const updatedUser = await User.update(req.body, {
    where: { id: req.params.id },
  });
  res.json(updatedUser);
});
userRouter.delete("/:id", async (req, res) => {
  const deleteduser = User.destroy({ where: { id: req.params.id } });
  res.json(deleteduser);
});

module.exports = userRouter;
