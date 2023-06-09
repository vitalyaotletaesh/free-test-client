import React, {useEffect, useState} from 'react';
import {Card, Row} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {getAllCategories, setCategoryId} from "../redux/features/auth/testSlice";

const CategoryBar = ({homePage}) => {
    const dispatch = useDispatch()
    const [selectedCategory, setSelectedCategory] = useState('Все')

    useEffect(() => {
        dispatch(getAllCategories())
        homePage && dispatch(setCategoryId(2))
    }, [])

    const categories = useSelector((state) => state.test.categories)
    const categoryId = useSelector((state) => state.test.categoryId)

    const handleSelectCategory = (id) => {
        dispatch(setCategoryId(id))
    }

    return (
        <Row className='d-flex flex-row justify-content-center'>
            {categories?.length > 0 ? (
                    categories.map((category, index) => (
                        homePage ?
                            (
                                category.id === 1 ?
                                    <div key={index}></div>
                                    :
                                    <Card
                                        key={index}
                                        className={(categoryId === category.id) ? 'bg-success p-3 m-lg-3 text-center' : 'p-3 m-lg-3 text-center'}
                                        style={{width: 200, cursor: 'pointer'}}
                                        onClick={() => handleSelectCategory(category.id)}
                                    >
                                        <span>{category.name}</span>
                                    </Card>
                            )
                            :
                            (
                                <Card
                                    key={index}
                                    className={(categoryId === category.id) ? 'bg-success p-3 m-lg-3 text-center' : 'p-3 m-lg-3 text-center'}
                                    style={{width: 200, cursor: 'pointer'}}
                                    onClick={() => handleSelectCategory(category.id)}
                                >
                                    <span>{category.name}</span>
                                </Card>
                            )
                    ))
                )
                :
                <></>
            }
        </Row>
    );
};

export default CategoryBar;