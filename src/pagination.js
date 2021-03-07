import "./pagination.css";

function getPages(totalPages) {
  const pages = [];
  for (let i = 0; i < totalPages; i++) {
    pages.push(i);
  }
  return pages;
}

function Pagination({ totalPages, setPage, currentPage }) {
  return (
    <div className="Pagination">
      {getPages(totalPages).map((page) => {
        return (
          <button
            key={page}
            onClick={() => setPage(page)}
            className={page === currentPage ? "active" : ""}
          >
            {page + 1}
          </button>
        );
      })}
    </div>
  );
}

export default Pagination;
