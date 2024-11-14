const Book = require('../models/Book');

// Add a new book
exports.addBook = async (req, res) => {
  const { title, author, genre, yearOfPublication } = req.body;
  try {
    const book = await Book.create({ title, author, genre, yearOfPublication });
    res.status(201).json(book);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get books with pagination and filtering
exports.getBooks = async (req, res) => {
  const { genre, author, page = 1, limit = 10 } = req.query;
  const filters = {};
  if (genre) filters.genre = genre;
  if (author) filters.author = author;

  try {
    const books = await Book.findAll({
      where: filters,
      limit: parseInt(limit),
      offset: (parseInt(page) - 1) * parseInt(limit),
    });
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update book details
exports.updateBook = async (req, res) => {
  const { id } = req.params;
  const { title, author, genre, yearOfPublication } = req.body;
  try {
    const updatedBook = await Book.update({ title, author, genre, yearOfPublication }, { where: { id } });
    res.json(updatedBook);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a book
exports.deleteBook = async (req, res) => {
  const { id } = req.params;
  try {
    await Book.destroy({ where: { id } });
    res.json({ message: 'Book deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
