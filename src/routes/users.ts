// routes/users.ts
// это файл маршрутов
import { Router } from "express";
import { validateGetProfile, validateUpdateAvatar, validateUpdateUser } from "../middlewares/validateUser";
import { getCurrentUser, getProfile, getUsers, updateAvatar, updateUser } from "../controllers/users";

const router = Router();

router.get("/me", getCurrentUser);

router.patch("/me", validateUpdateUser, updateUser);
router.patch("/me/avatar", validateUpdateAvatar, updateAvatar);

router.get("/", getUsers);
router.get("/:userId", validateGetProfile, getProfile);

export default router
