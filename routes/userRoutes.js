import express from "express";
const router = express.Router();
import validateToken from "../middleware/validateTokenHandler.js";
import userController from "../controllers/userController.js";

console.log(typeof validateToken);

router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.get("/current", validateToken, userController.currentUser);

export default router;
