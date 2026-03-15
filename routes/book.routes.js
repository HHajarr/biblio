import express from "express";
import {BookController} from "../controllers/book.controller.js";

const initBookRoutes = (app) => {
    const router = express.Router()
    router.post("/create",BookController.createBook)
    router.get("/read", BookController.readBooks)
    router.get("/readone/:id_books", BookController.readOneBook)

app.use("/books",router)
}

export default initBookRoutes;