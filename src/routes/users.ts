// routes/users.ts
// это файл маршрутов
import { Router } from "express";
import { createUser, getUser, getUsers, updateAvatar, updateUser } from "../controllers/users";

const router = Router();

// users
router.post("/", createUser);
router.get("/:userId", getUser);
router.get("/", getUsers);

// options
router.patch("/me", updateUser);
router.patch("/me/avatar", updateAvatar);

export default router
