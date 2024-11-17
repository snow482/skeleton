const BookService = require("../service/Book.service");

exports.getAllBooksController = async (req, res) => {
  try {
    const books = await BookService.getAllBooks();
    res.status(200).json({ message: "success", books });
  } catch (error) {
    res.status(500).json({ message: error.message, books: [] });
  }
};

exports.getOneBookController = async (req, res) => {
  try {
    const book = await BookService.getOneBook();
    res.status(200).json({ message: "success", book });
  } catch (error) {
    res.status(500).json({ message: error.message, book: {} });
  }
};

exports.createBookController = async (req, res) => {
  const { title, author, pages, category_id } = req.body;
  const authUser = res.locals.user
  if (!title || !author || title.trim() === "" || author.trim() === "") {
    res.status(400).json({ message: "Данные пустые" });
    return;
  }
  try {
    const book = await BookService.createBook({
      title,
      author,
      pages,
      category_id,
      user_id: authUser.id,
    });
    res.status(200).json({ message: "success", book });
  } catch (error) {
    res.status(500).json({ message: error.message, book: {} });
  }
};

exports.deleteBookController = async (req, res) => {
  const { id } = req.params;
  const authUserId =  res.locals.user.id
  try {
    const countDeletedBooks = await BookService.deleteBook(id,authUserId);
    if (countDeletedBooks > 0) {
      res.status(200).json({ message: "success" });
    } else {
      res.status(400).json({ message: "Not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateBookController = async (req, res) => {
  const { title, author, pages, category_id, user_id } = req.body;
  const { id } = req.params;
  if (!title || !author || title.trim() === "" || author.trim() === "") {
    res.status(400).json({ message: "Данные пустые" });
    return;
  }
  try {
    const countUpdated = await BookService.updateBook(req.body, id);
    if (countUpdated > 0) {
      const book = await BookService.getOneBook(id);
      res.status(200).json({ message: "success", book });
    } else {
      res.status(200).json({ message: "fail" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message, book: {} });
  }
};

 
