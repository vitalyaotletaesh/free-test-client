import React, {useEffect, useState} from 'react';
import {Card, Row} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {getAllCategories, setCategoryId} from "../redux/features/auth/testSlice";

const CategoryBar = () => {
    const dispatch = useDispatch()
    const [selectedCategory, setSelectedCategory] = useState('Все')

    useEffect(() => {
        dispatch(getAllCategories())
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
                        <Card
                            key={index}
                            className={(categoryId === category.id) ? 'bg-success p-3 m-lg-3 text-center' : 'p-3 m-lg-3 text-center'}
                            style={{width: 200, cursor: 'pointer'}}
                            onClick={() => handleSelectCategory(category.id)}
                        >
                            <span>{category.name}</span>
                        </Card>
                    ))
                )
                :
                <></>
            }
        </Row>
    );
};

export default CategoryBar;