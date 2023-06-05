import React from 'react';
import {Pagination} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {setPage} from "../redux/features/auth/testSlice";

const Pages = () => {
    const dispatch = useDispatch()
    const totalCountTests = useSelector((state) => state.test.totalCount)
    const limit = useSelector((state) => state.test.limit)
    const activePage = useSelector((state) => state.test.page)
    const pageCount = Math.ceil(totalCountTests / limit)
    const pages = []

    for (let i = 0; i < pageCount; i++) {
        pages.push(i + 1)
    }

    const handleSetPage = (page) => {
        console.log(page)
        dispatch(setPage(page))
    }

    return (
        <Pagination className="mt-5">
            {pages.map(page =>
                <Pagination.Item
                    key={page}
                    active={page === activePage}
                    onClick={() => handleSetPage(page)}
                >
                    {page}
                </Pagination.Item>
            )}
        </Pagination>
    );
};

export default Pages;