import query from "./init.database.js";

// Fonction pour récupérer les commentaire dans la base de données
const readComment = async () => {
  const sql = `
        SELECT *
        FROM comment
        ORDER BY content
    `;

  let error = null;
  let result = null;

  try {
    result = await query(sql);
  } catch (e) {
    error = e.message;
    console.error("Error reading comment:", e);
  } finally {
    return { error, result };
  }
};

// Fonction pour récupérer un seul commentaire
const getUserComment = async (id_comment) => {
  const sql = `
        SELECT id_user
        FROM comment
        WHERE id_comment = ?
    `;

  let error = null;
  let idUser = null;

  try {
    idUser = await query(sql, [id_comment]);
  } catch (e) {
    error = e.message;
    console.error("Error reading single comment:", e);
  } finally {
    return { error, idUser };
  }
};

const readCommentByBook = async (id_books) => {
  const sql = `
  SELECT *
  FROM comment
  WHERE id_books = ?
  `
  let error = null;
  let result = null;

  try {
    result = await query(sql, [id_books]);
  } catch (e) {
    error = e.message;
    console.error("Error reading comments:", e);
  } finally {
    return { error, result };
  }  
};

const readCommentByUser = async (id_user) => {
  const sql = `
  SELECT *
  FROM comment
  WHERE id_user = ?
  `
  let error = null;
  let result = null;

  try {
    result = await query(sql, [id_user]);
  } catch (e) {
    error = e.message;
    console.error("Error reading comments:", e);
  } finally {
    return { error, result };
  }  
};


// Fonction pour créer un commentaire
const createComment = async (content, created_at, verified) => {
    const sql = `
    INSERT INTO comment (content, created_at, verified) VALUES (?, ?, ?)`;

  let error = null;
  let result = null;

  try {
    result = await query(sql, [content, created_at, verified]);
    console.log("Database insert result",result)
  } catch (e) {
    error = e.message;
    console.error("Error insert single comment:", e);
  } finally {
    return { error, result };
  }   
}

// Fonction pour modifier un commentaire
const updateComment = async (content, created_at, verified, id_comment) => {
    const sql = `
    UPDATE comment SET content = ?, created_at = ?, verified = ? WHERE id_comment = ?`;

  let error = null;
  let result = null;

  try {
    result = await query(sql, [content, created_at, verified, id_comment]);
    console.log("Database update result",result)
  } catch (e) {
    error = e.message;
    console.error("Error update single comment:", e);
  } finally {
    return { error, result };
  }   
}

// Fonction pour supprimer un commentaire
const deleteOneComment = async (id_comment) => {
  const sql = `
        DELETE FROM comment
        WHERE id_comment = ?
    `;

  let error = null;
  let result = null;

  try {
    result = await query(sql, [id_comment]);
  } catch (e) {
    error = e.message;
    console.error("Error deleting single comment:", e);
  } finally {
    return { error, result };
  }
};

export const commentDB = {
    readComment,
    getUserComment,
    readCommentByBook,
    readCommentByUser,
    createComment,
    updateComment,
    deleteOneComment
}