import express from "express";
import { Book } from "../models/bookmodel.js";

const router = express.Router();

//route to save new book
router.post("/", async (req, res) => {
  try {
    if (
      !req.body.title ||
      !req.body.author ||
      !req.body.publishYear ||
      !req.body.text
    ) {
      return res.status(400).send({
        message: "Send all required fields: e1",
      });
    }
    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
      text: req.body.text,
    };
    const book = await Book.create(newBook);
    return res.status(201).send(book);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

//route for get all all books
router.get("/", async (req, res) => {
  try {
    const books = await Book.find();
    const count = await Book.countDocuments();
    return res.status(200).json({
      count: count,
      data: books,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({
      message: error.message,
    });
  }
});

//route for get one book
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    return res.status(200).json(book);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({
      message: error.message,
    });
    console.log("error.message");
  }
});

//route for update a book
router.put("/:id", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({
        message: "Send all required fields: title, author, publishYear",
      });
    }
    const { id } = req.params;
    try {
      const result = await Book.findByIdAndUpdate(id, req.body);

      if (!result) {
        return res.status(404).json({
          message: "Book not found",
        });
      }

      return res.status(200).send({
        message: "Book updated successfully",
      });
    } catch (error) {
      if (error.name === "CastError") {
        // Handle invalid ObjectId
        return res.status(400).json({
          message: "Invalid book ID",
        });
      }
      throw error;
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send({
      message: error.message,
    });
  }
});

//route for delete a book
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
    console.log(error.message);
    res.status(500).send({
      message: error.message,
    });
  }
});

export default router;
