import { useState, useEffect, createContext } from "react";

const localBookmarks = JSON.parse(localStorage.getItem("bookmarks") || "[]");

export const BookmarksContext = createContext();

export const BookmarksProvider = ({ children }) => {
  const [bookmarks, setBookmarks] = useState(localBookmarks);
  const [isBookmarksEmpty, setIsBookmarksEmpty] = useState(true);

  useEffect(() => {
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    if (bookmarks.length > 0) {
      setIsBookmarksEmpty(false);
    }
  }, [bookmarks]);

  const addBookmark = (itemToAdd) => {
    if (!isInBookmarks(itemToAdd.id)) {
      setBookmarks([...bookmarks, itemToAdd]);
    }
  };

  const isInBookmarks = (id) => {
    return bookmarks.some((bookmark) => bookmark.id === id);
  };

  const deleteBookmark = (id) => {
    const updatedBookmarks = bookmarks.filter((bookmark) => bookmark.id !== id);
    setBookmarks(updatedBookmarks);
    if (updatedBookmarks.length === 0) {
      setIsBookmarksEmpty(true)
    }
  };

  return (
    <BookmarksContext.Provider
      value={{ bookmarks, addBookmark, deleteBookmark, isInBookmarks, isBookmarksEmpty }}
    >
      {children}
    </BookmarksContext.Provider>
  );
};
