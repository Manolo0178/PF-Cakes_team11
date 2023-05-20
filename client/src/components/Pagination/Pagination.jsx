import React from 'react'
import styles from "./Pagination.module.css"

const Pagination = ({
  cardsPage,
  paginate,
  page,
  allCards,
  nextChange,
  previousChange,
}) => {

     const pages = Math.ceil(allCards / cardsPage);
     if (pages < page) paginate(1);

     let numberPages = [];
     for (let i = 0; i < pages; i++) {
       numberPages.push(i + 1);
    }
    

  return (
    <div className={styles.paginationCont}>
      <button
        className={styles.pageChange}
        onClick={() => {
          previousChange();
        }}
      >
        Anterior
      </button>
      <div className={styles.pageCont}>
        {numberPages?.map((pag, i) => (
          <button
            className={`${styles.pageNum} ${page === pag && styles.active}`}
            key={i}
            onClick={() => paginate(pag)}
          >
            {pag}
          </button>
        ))}
      </div>
      <button
        className={styles.pageChange}
        onClick={() => {
          nextChange();
        }}
      >
        Siguiente
      </button>
    </div>
  );
};

export default Pagination