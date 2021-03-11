import React, {useState} from "react";
import {Pagination} from "react-bootstrap";
import ReactPaginate from "react-paginate";

export type pageType = {
    total: number
}

interface Prop {
    data: pageType,
    changePage: (page: number) => void
}

export const PaginationComponent: React.FC<Prop> = ({data, changePage}) => {
    const handleChangePage = (i: any) => {
        changePage(i.selected);
    }

    return (
        <ReactPaginate
            pageCount={data.total}
            previousLabel={'previous'}
            nextLabel={'next'}
            breakLabel={'...'}
            pageClassName={'page-item'}
            pageLinkClassName={'page-link'}
            containerClassName={'pagination'}
            activeClassName={'active'}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            previousClassName={'page-item'}
            previousLinkClassName={'page-link'}
            nextClassName={'page-item'}
            nextLinkClassName={'page-link'}
            onPageChange={handleChangePage}
        />
    )
}