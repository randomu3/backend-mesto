// routes/cards.ts
// это файл маршрутов
import { createCard, delCard, dislikeCard, getCards, likeCard } from "../controllers/cards";
import { Router } from "express";
import { valdateDelCard, valdateDislikeCard, valdateLikeCard, validateCreateCards } from "../middlewares/validateCard";
const router = Router();

// cards
router.get("/", getCards);
router.post("/", validateCreateCards, createCard);
router.delete("/:cardId", valdateDelCard, delCard);

// options
router.put("/:cardId/likes", valdateLikeCard, likeCard);
router.delete("/:cardId/likes", valdateDislikeCard, dislikeCard)

export default router