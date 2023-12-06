import express from "express";
import { Book } from "../models/bookmodel.js";

const router = express.Router();

// Route to save a new book
router.post("/", async (req, res) => {
  try {
    // Validate request body
    if (!req.body.title || !req.body.finishtill || !req.body.text) {
      return res.status(400).send({
        message: "Send all required fields: title, finishtill, text",
      });
    }

    // Create a new book
    const newBook = {
      title: req.body.title,
      finishtill: req.body.finishtill,
      text: req.body.text,
    };

    const book = await Book.create(newBook);
    return res.status(201).send(book);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send({ message: "Internal Server Error" });
  }
});

// Route to get all books
router.get("/", async (req, res) => {
  try {
    const books = await Book.find();
    const count = await Book.countDocuments();
    return res.status(200).json({
      count: count,
      data: books,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).send({ message: "Internal Server Error" });
  }
});

// Route to get one book by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    return res.status(200).json(book);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send({ message: "Internal Server Error" });
  }
});

// Route to update a book by ID
router.put("/:id", async (req, res) => {
  try {
    // Validate request body
    if (!req.body.title || !req.body.text || !req.body.finishtill) {
      return res.status(400).send({
        message: "Send all required fields: title, text, finishtill",
      });
    }

    const { id } = req.params;
    const result = await Book.findByIdAndUpdate(id, req.body, { new: true });

    if (!result) {
      return res.status(404).json({
        message: "Book not found",
      });
    }

    return res.status(200).send({
      message: "Book updated successfully",
    });
  } catch (error) {
    console.error(error.message);
    if (error.name === "CastError") {
      return res.status(400).json({
        message: "Invalid book ID",
      });
    }
    return res.status(500).send({ message: "Internal Server Error" });
  }
});

// Route to delete a book by ID
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Book.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({ message: "Book not found" });
    }

    return res.status(200).send({
      message: "Book deleted successfully",
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).send({ message: "Internal Server Error" });
  }
});

export default router;
