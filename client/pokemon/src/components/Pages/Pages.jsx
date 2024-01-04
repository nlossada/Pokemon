

const Pages = (props) => {
    const { currentPage, cardsPerPage, totalCards, onPageChange } = props
    const totalPages = Math.ceil(totalCards / cardsPerPage)



    const onClickPages = (page) => {
        if (currentPage >= 1 && currentPage <= totalPages)
            onPageChange(page)
    }


    return (
        <div>
            <button onClick={() => onClickPages(1)}>START</button>
            <button
                onClick={() => onClickPages(currentPage - 1)}
                disabled={currentPage === 1}
            >PREVIOUS</button>
            <span>{currentPage} OF {totalPages}</span>
            <button
                onClick={() => onClickPages(currentPage + 1)}
                disabled={currentPage === totalPages}
            >NEXT</button>
            <button onClick={() => onClickPages(totalPages)}>END</button>
        </div>

    )
}

export default Pages;