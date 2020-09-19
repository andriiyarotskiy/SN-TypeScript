import React from "react";
import styles from './Paginator.module.css'


type PaginatorType = {
    currentPage: number
    pageSize: number
    totalUsersCount: number
    onPageChanged: (pageNumber: number) => void
}

let Paginator = ({currentPage, onPageChanged, pageSize, totalUsersCount}: PaginatorType) => {

    let pagesCount = Math.ceil((totalUsersCount / pageSize) / 100)

    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }
    return <div>
        {pages.map(p => {
            return <span key={p} className={(currentPage === p && styles.selectedPage) || ''}
                         onClick={() => {
                             onPageChanged(p)
                         }}>{p}</span>
        })}
    </div>
}

export default Paginator