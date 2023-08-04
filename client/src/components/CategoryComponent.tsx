'use client'
import { useMenuContext } from '@/contexts/MenuContext'
import React from 'react'

const CategoryComponent = () => {
    const { categories } = useMenuContext()

    return (
        <div>
            {categories.length > 0 ? (
                <>
                    {categories?.map((category, index) => (
                        <div key={index} className='border border-white my-2'>
                            <div>{category.id}</div>
                            <div>{category.name}</div>
                        </div>
                    ))}
                </>
            ) : (
                <div>Hello</div>
            )}
        </div>
    )
}

export default CategoryComponent