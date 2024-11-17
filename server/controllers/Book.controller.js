const BookService = require("../services/Book.service");

exports.createBookController = async (req, res) => {
  try {
    const { title, description, cover } = req.body;
    const user_id = res.locals.user.id;
    if ( title.trim() === "" || description.trim() === "" || cover.trim() === "" ) {
      console.log("Fill in all the blanks!");
      return res.status(400).json({ message: "Fill in all the blanks!" });
    }
    const book = await BookService.addBook({
      title,
      description,
      cover,
      user_id,
    });
    return res.status(201).json({ message: "success", book });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

exports.getAllBooksController = async (req, res) => {
  try {
    const books = await BookService.getAllBooks();
    if (books) {
      return res.status(200).json({ message: "success", books });
    }
    res.status(400).json({ message: "Can`t find the book" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

exports.updateBookController = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, cover } = req.body;
    const user_id = res.locals.user.id;
    if ( title.trim() === "" || description.trim() === "" || cover.trim() === "" ) {
      console.log("Fill in all the blanks!");
      return res.status(400).json({ message: "Fill in all the blanks!" });
    }
    let book = await BookService.getBookById(id);
    if (book) {
      book = await BookService.updateBookByUser(id, user_id, {
        title,
        description,
        cover,
      });
      return res.status(200).json({ message: "success", book });
    }
    res.status(400).json({ message: "invalid" });
  } catch ({ message }) {
    res.status(500).json({ error: message });
  }
}

exports.deleteBookController = async (req, res) => {
  try {
    const { id } = req.params;
    const user_id = res.locals.user.id;
    let book = await BookService.getBookById(id);
    if (book) {
      book = await BookService.deleteBookByUser(id, user_id);
      return res.status(200).json({ message: "success", book });
    }
    res.status(400).json({ message: "invalid" });
  } catch ({ message }) {
    res.status(500).json({ error: message });
  }
}

