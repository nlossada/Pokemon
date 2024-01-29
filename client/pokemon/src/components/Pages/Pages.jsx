import style from "./Pages.module.css"

const Pages = (props) => {
    const { currentPage, cardsPerPage, totalCards, onPageChange } = props
    const totalPages = Math.ceil(totalCards / cardsPerPage)



    const onClickPages = (page) => {
        if (currentPage >= 1 && currentPage <= totalPages)
            onPageChange(page)
    }


    return (
        <div className={style.buttonPages}>
            <button
                onClick={() => onClickPages(1)}
                disabled={currentPage === 1}
            >⏮️</button>
            <button
                onClick={() => onClickPages(currentPage - 1)}
                disabled={currentPage === 1}
            >◀️</button>
            <span>{currentPage} OF {totalPages === 0 ? 1 : totalPages}</span>
            <button
                onClick={() => onClickPages(currentPage + 1)}
                disabled={currentPage === totalPages}
            >▶️</button>
            <button
                onClick={() => onClickPages(totalPages)}
                disabled={currentPage === totalPages}
            >⏭️</button>
        </div>

    )
}

export default Pages;