const router = require("express").Router();
const {
  getUsers,
  updateUser,
  getUserById,
  getCurrentUser,
} = require("../controllers/users");

const {
  userDataValidator,
  userIdValidator,
} = require("../middlewares/validators/userValidator");

router.get("/me", getCurrentUser);
router.get("/:userId", userIdValidator, getUserById);
router.get("/", getUsers);
router.patch("/me", userDataValidator, updateUser);

module.exports = router;
