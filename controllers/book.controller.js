import { bookDB } from "../database/book.database.js";

const createBook = async (req, res) => {
    try{
        const {title, autor, resume, published_at, cover, genre, verified} = req.body
        const response = await bookDB.createBook(title, autor, resume, published_at, cover, genre, verified)
        if(response.error){return res.status(500).json({message: response.error})}
        return res.status(201).json({message:"Votre livre a été ajouté avec succès", id_books:response.result.insertId})
    } 
    catch(error){console.error("Controller error",error)
        return res.status(500).json({message: error.message})
    }
}

// Fonction pour récupérer tous les books
const readBooks = async (req, res) => {
  try {
    const booksResponse = await bookDB.readBooks();
    if (booksResponse.error) {
      return res.status(500).json({ message: booksResponse.error });
    }
    const books = booksResponse.result;
    return res.status(200).json({ message: "OK", books });
  } catch (error) {
    console.error("Error fetching books:", error);
    return res.status(500).json({ message: error.message });
  }
};

const readOneBook = async (req, res) => {
  try {
    const id_books = req.params.id_books;
    const response = await bookDB.readOneBook(id_books);
    if (response.error) {
      return res.status(500).json({ message: response.error });
    }
    if (!response.result || response.result.length === 0) {
      return res.status(404).json({ message: "Livre non trouvé" });
    }
    const result = response.result;
    const book = {
        id_books,
        title: result[0].title,
        autor: result[0].autor,
        resume: result[0].resume,
        published_at: result[0].published_at,
        cover: result[0].cover,
        genre: result[0].genre,
        verified: result[0].verified
    }
    return res.status(200).json({message:"Requête OK",book})
    } catch (error){
        console.error("Error fetching books:", error);
        return res.status(500).json({ message: error.message }); 
    }
}

export const BookController = {
    readOneBook,
    readBooks,
    createBook
}