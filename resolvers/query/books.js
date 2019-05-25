const _ = require("lodash");

function findAllBooks(root, args, { books }) {
  return books;
}

function findBookById(root, { id }, { booksMap }) {
  return _.get(booksMap, id);
}

function searchBook(root, { text }, { fuse, booksMap }) {
  return fuse.search(text).map(id => _.get(booksMap, id));
}

module.exports = {
  findAllBooks,
  findBookById,
  searchBook
};
