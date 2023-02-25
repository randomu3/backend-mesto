// routes/cards.ts
// это файл маршрутов
import { createCard, delCard, dislikeCard, getCards, likeCard } from "../controllers/cards";
import { Router } from "express";
const router = Router();

// cards
router.get("/", getCards);
router.post("/", createCard);
router.get("/:cardId", delCard);

// options
router.put("/:cardId/likes", likeCard);
router.delete("/:cardId/likes", dislikeCard)

export default router