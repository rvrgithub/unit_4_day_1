const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());
const connectDb = () => {
  return mongoose.connect("mongodb://localhost:27017/studentData");
};
// 1- Create  Schema for Section..........
const sectionSchema = new mongoose.Schema({
  section_name: { type: String, required: true },
});
//1.1- Connect the schema to section collection
const Section = mongoose.model("section", sectionSchema);

// 2- Create schema for books............
const bookSchema = new mongoose.Schema({
  books_name: { type: String, required: true },
  body: { type: String, required: true },
  title: { type: String, required: true },
  checkedOutTime: Date,
    checkedInTime: Date,
  section_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "section",
    require: true,
  },
});
// 2.1- Connect the schema to books collection
const Book = mongoose.model("book", bookSchema);


// 3- Create schema for author...............
const authorSchema = new mongoose.Schema({
  author_name: { type: String, require: true },
});
// 3.1- Connect the schema to authors collection
const Author = mongoose.model("author", authorSchema);

// 4-   Create schema for book author........
const bookAuthorSchema = new mongoose.Schema({
  books_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "book",
    required: true,
  },
  author_id: [
    { type: mongoose.Schema.Types.ObjectId, ref: "author", required: true },
  ],
});
// 4.1- Connect the Schema to bookAuthors collection........
const BookAuthor = mongoose.model("booksAuthor", bookAuthorSchema);


// 5-  user schema...............
const userCheckedOutSchema = new mongoose.Schema({
  section_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "section",
    require: true,
  },
  books_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "books",
    require: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "author",
    require: true,
  },
  // if(checkedInTime){
  //   const bookavilable = req.body.book_id
  // }
});

const User = mongoose.model("user", userCheckedOutSchema);

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

// CRUD  api for books...............

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
