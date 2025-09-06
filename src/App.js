import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const [recentSearches, setRecentSearches] = useState([]);
  const [savedBooks, setSavedBooks] = useState([]);
  const [learningList, setLearningList] = useState([]);

  // Dropdown state, closed by default
  const [showSaved, setShowSaved] = useState(false);
  const [showLearning, setShowLearning] = useState(false);

  // Sidebar visibility toggle
  const [sidebarVisible, setSidebarVisible] = useState(false);

  // Load saved data once
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("savedBooks")) || [];
    const learning = JSON.parse(localStorage.getItem("learningList")) || [];
    const recents = JSON.parse(localStorage.getItem("recentSearches")) || [];
    setSavedBooks(saved);
    setLearningList(learning);
    setRecentSearches(recents);
  }, []);

  const saveToStorage = (key, data) =>
    localStorage.setItem(key, JSON.stringify(data));

  const addToRecentSearches = (term) => {
    setRecentSearches((prev) => {
      const updated = [term, ...prev.filter((q) => q !== term)].slice(0, 5);
      saveToStorage("recentSearches", updated);
      return updated;
    });
  };

  const fetchBookRating = async (workKey) => {
    try {
      const response = await fetch(`https://openlibrary.org${workKey}/ratings.json`);
      const data = await response.json();
      return data.summary?.average || null;
    } catch {
      return null;
    }
  };

  const fetchBooks = async (pageNum = 1) => {
    if (!query) return;
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://openlibrary.org/search.json?title=${encodeURIComponent(query)}&limit=20&page=${pageNum}`
      );
      const data = await response.json();

      let results = data.docs || [];

      const updatedResults = await Promise.all(
        results.slice(0, 10).map(async (book) => {
          const avgRating = await fetchBookRating(book.key);
          return { ...book, ratings_average: avgRating };
        })
      );

      results = updatedResults.concat(results.slice(10));

      const sorted = results.sort((a, b) => {
        const ratingA = a.ratings_average || 0;
        const ratingB = b.ratings_average || 0;
        const editionsA = a.edition_count || 0;
        const editionsB = b.edition_count || 0;

        if (ratingB !== ratingA) return ratingB - ratingA;
        return editionsB - editionsA;
      });

      setBooks(sorted);
      setPage(pageNum);
      setTotalPages(Math.ceil((data.numFound || 0) / 20));
      addToRecentSearches(query);
      setSidebarVisible(false);
    } catch {
      setError("Failed to fetch books");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => fetchBooks(1);
  const handleLoadMore = () => {
    if (page < totalPages) fetchBooks(page + 1);
  };

  const saveBook = (book) => {
    setSavedBooks((prev) => {
      const updated = [...prev, book].filter(
        (b, i, arr) => arr.findIndex((x) => x.key === b.key) === i
      );
      saveToStorage("savedBooks", updated);
      return updated;
    });
  };

  const removeBook = (key) => {
    setSavedBooks((prev) => {
      const updated = prev.filter((b) => b.key !== key);
      saveToStorage("savedBooks", updated);
      return updated;
    });
  };

  const addToLearning = (book) => {
    setLearningList((prev) => {
      const updated = [...prev, book].filter(
        (b, i, arr) => arr.findIndex((x) => x.key === b.key) === i
      );
      saveToStorage("learningList", updated);
      return updated;
    });
  };

  const removeFromLearning = (key) => {
    setLearningList((prev) => {
      const updated = prev.filter((b) => b.key !== key);
      saveToStorage("learningList", updated);
      return updated;
    });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  const getVisiblePages = () => {
    if (totalPages <= 3) return [...Array(totalPages)].map((_, i) => i + 1);
    if (page === 1) return [1, 2, 3];
    if (page === totalPages) return [totalPages - 2, totalPages - 1, totalPages];
    return [page - 1, page, page + 1];
  };

  return (
    <div className="main-layout">
      {/* Show menu button only when sidebar is closed */}
      {!sidebarVisible && (
        <button
          className="menu-btn"
          onClick={() => setSidebarVisible(true)}
          aria-label="Open sidebar"
        >
          ☰
        </button>
      )}

      <aside className={`sidebar ${sidebarVisible ? "visible" : ""}`}>
        <h1 className="sidebar-title">
          <span className="logo">📖</span> Book Finder
        </h1>

        {/* Saved Books Dropdown */}
        <button
          className="sidebar-toggle-btn"
          onClick={() => setShowSaved((b) => !b)}
          aria-expanded={showSaved}
        >
          ⭐ Saved Books 
          <span className={`arrow ${showSaved ? "open" : ""}`}>▼</span>
        </button>
        {showSaved && (
          savedBooks.length === 0 ? (
            <p className="sidebar-info">No saved books yet</p>
          ) : (
            <ul className="saved-list">
              {savedBooks.map((book) => (
                <li key={book.key} className="saved-item">
                  <span>{book.title}</span>
                  <div>
                    <button onClick={() => addToLearning(book)}>📖 Learn</button>
                    <button onClick={() => removeBook(book.key)}>❌</button>
                  </div>
                </li>
              ))}
            </ul>
          )
        )}

        {/* Learning List Dropdown */}
        <button
          className="sidebar-toggle-btn"
          onClick={() => setShowLearning((b) => !b)}
          aria-expanded={showLearning}
        >
          📖 My Learning List 
          <span className={`arrow ${showLearning ? "open" : ""}`}>▼</span>
        </button>
        {showLearning && (
          learningList.length === 0 ? (
            <p className="sidebar-info">No books added for learning</p>
          ) : (
            <ul className="saved-list">
              {learningList.map((book) => (
                <li
                  key={book.key}
                  className="saved-item"
                  onClick={() =>
                    window.open(`https://openlibrary.org${book.key}`, "_blank")
                  }
                  style={{ cursor: "pointer" }}
                >
                  <span>{book.title}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFromLearning(book.key);
                    }}
                  >
                    ❌
                  </button>
                </li>
              ))}
            </ul>
          )
        )}
      </aside>

      {/* Overlay for closing sidebar */}
       <div
    className="overlay"
    style={{ display: sidebarVisible ? "block" : "none" }}
    onClick={() => setSidebarVisible(false)}
  />

      {/* Main content */}
      <div className="content">
        <div className="header">
          <h1>📚 Book Finder</h1>

          <div className="search-container">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Enter book title"
              className="search-input"
            />
            <button onClick={handleSearch} className="search-button">
              Search
            </button>
          </div>
        </div>

        {recentSearches.length > 0 && (
          <div className="recent-searches">
            <p>Recent:</p>
            {recentSearches.map((term, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setQuery(term);
                  fetchBooks(1);
                }}
                className="recent-btn"
              >
                {term}
              </button>
            ))}
          </div>
        )}

        {loading && <p className="loading">Loading...</p>}
        {error && <p className="error">{error}</p>}
        {!loading && books.length === 0 && query && (
          <p className="no-results">No results found</p>
        )}

        <ul className="book-list">
          {books.map((book) => (
            <li key={book.key} className="book-item">
              {book.cover_i ? (
                <img
                  loading="lazy"
                  src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
                  alt={book.title}
                  className="book-cover"
                />
              ) : (
                <div className="book-cover placeholder">No Image</div>
              )}
              <div className="book-details">
                <h3>{book.title}</h3>
                <p>
                  Author:{" "}
                  {book.author_name ? book.author_name.join(", ") : "Unknown"}
                </p>
                <p>First Published: {book.first_publish_year || "N/A"}</p>
                {book.ratings_average ? (
                  <p>⭐ Rating: {book.ratings_average.toFixed(1)}</p>
                ) : (
                  <p>⭐ Rating: Not available</p>
                )}
                <div className="book-actions">
                  <button onClick={() => saveBook(book)}>⭐ Save</button>
                  <a
                    href={`https://openlibrary.org${book.key}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View More →
                  </a>
                </div>
              </div>
            </li>
          ))}
        </ul>

        {page < totalPages && !loading && (
          <button onClick={handleLoadMore} className="load-more">
            Load More
          </button>
        )}

        {totalPages > 1 && (
          <div className="pagination">
            {page > 1 && (
              <button onClick={() => fetchBooks(page - 1)} className="page-btn">
                Prev
              </button>
            )}
            {getVisiblePages().map((p) => (
              <button
                key={p}
                className={`page-btn ${page === p ? "active" : ""}`}
                onClick={() => fetchBooks(p)}
              >
                {p}
              </button>
            ))}
            {page < totalPages && (
              <button onClick={() => fetchBooks(page + 1)} className="page-btn">
                Next
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
