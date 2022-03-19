const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());
const connectDb = () => {
  // mongoose.connect("mongodb://localhost:27017/moviesData");
  return mongoose.connect("mongodb://localhost:27017/studentData");
};
// 1-  section schema........
const sectionSchema = new mongoose.Schema({
  section_name: { type: String, required: true },
});

const Section = mongoose.model("section", sectionSchema);

// 2- books schema..........
const bookSchema = new mongoose.Schema({
  books_name: { type: String, required: true },
  body: { type: String, required: true },
  title: { type: String, required: true },
  section_name: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "section",
    require: true,
  },
});

const Book = mongoose.model("books", bookSchema);
// 3- suthor schema.............
const authorSchema = new mongoose.Schema({
  author_name: { type: String, require: true },
});

const Author = mongoose.model("author", authorSchema);

// 4-  booksAuthor schema......
const bookAuthorSchema = new mongoose.Schema({
  books_name: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "book",
    required: true,
  },
  author_name: [
    { type: mongoose.Schema.Types.ObjectId, ref: "author", required: true },
  ],
});
const BookAuthor = mongoose.model("booksAuthor", bookAuthorSchema);


// 5-  user schema...............
const userSchema = new mongoose.Schema({
  section: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "section",
    require: true,
  },
  books: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "books",
    require: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "author",
    require: true,
  },
});

const User = mongoose.model("user", userSchema);

// CRUD api for section ..........
app.get("/section", async (req, res) => {
  const section = await Section.find({}).lean().exec();
  console.log(section);
  return res.status(201).send(section);
});

app.post("/section", async (req, res) => {
  try {
    const section = await Section.create(req.body);

    console.log(section);
    return res.status(201).send(section);
  } catch (err) {
    return res.status(500).send({ massege: err.massege });
  }
});

// CRUD  api for books

app.get("/books", async (req, res) => {
  const books = await Book.find().populate("section_name").lean().exec();
  console.log(books);
  return res.send({ books: books });
});

app.post("/books", async (req, res) => {
  try {
    const books = await Book.create(req.body);

    console.log(books);
    return res.status(201).send({ books: books });
  } catch (err) {
    return res.status(500).send({ massege: err.massege });
  }
});

app.get("/books/:id", async (req, res) => {
  try {
    const books = await Book.findById(req.params.id);

    console.log(books);
    return res.status(201).send({ books: books });
  } catch (err) {
    return res.status(500).send({ massege: err.massege });
  }
});

// CRUD api for author..........
app.get("/author", async (req, res) => {
  const author = await Author.find({}).lean().exec();
  console.log(author);
  return res.send({ author: author });
});

app.post("/author", async (req, res) => {
  try {
    const author = await Author.create(req.body).lean().exec();
    return res.status(201).send(author);
  } catch (err) {
    return res.status(500).send({ massege: err.massege });
  }
});


// CRUD  api for booksAuthor

app.get("/booksAuthor", async (req, res) => {
    const booksAuthor = await BookAuthor.find().lean().exec();
    console.log(booksAuthor);
    return res.send({ booksAuthor: booksAuthor });
  });
  
  app.post("/booksAuthor", async (req, res) => {
    try {
      const booksAuthor = await BookAuthor.create(req.body);
  
      console.log(booksAuthor);
      return res.status(201).send({ booksAuthor: booksAuthor });
    } catch (err) {
      return res.status(500).send({ massege: err.massege });
    }
  });
  
  app.get("/booksAuthor/:id", async (req, res) => {
    try {
      const booksAuthor = await bookAuthor.findById(req.params.id);
  
      console.log(booksAuthor);
      return res.status(201).send({ booksAuthor: booksAuthor });
    } catch (err) {
      return res.status(500).send({ massege: err.massege });
    }
  });



//   / CRUD  api for user

  app.get("/user", async (req, res) => {
      const user = await User.find({author_name:req.params.id})
     .
      lean() .populate(author).exec();
      console.log(user);
      return res.send({ user: user });
    });
    
    app.post("/user", async (req, res) => {
      try {
        const user = await User.create(req.body);
    
        console.log(user);
        return res.status(201).send({ user: user });
      } catch (err) {
        return res.status(500).send({ massege: err.massege });
      }
    });
//   live connector.........
app.listen(6400, async (req, res) => {
  try {
    await connectDb();
  } catch (err) {
    console.log("err", err);
  }
  console.log("listening at 6400");
});
