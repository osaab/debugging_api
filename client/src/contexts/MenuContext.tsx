import { Category } from '@/models/category';
import axios from 'axios';
import React, { useState, ReactNode, useContext, useEffect } from 'react';

type RootLayoutProps = {
    children: ReactNode
}

interface MenuContextProps {
    categories: Category[]
}

const MenuContext = React.createContext<MenuContextProps | undefined>(undefined);

export const useMenuContext = () => {
    const context = useContext(MenuContext);
    if (!context) {
        throw new Error("useMenuContext must be used within a MenuProvider");
    }
    return context;
};

export const MenuProvider = ({ children }: RootLayoutProps) => {
    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        setLoading(true);
        const fetchData = async () => {
            try {
                const response = await axios.get('http://192.xxx.x.xxx:5012/api/categories');
                setCategories(response.data);
            } catch (error: any) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    if (loading) return <div>Loading...</div>

    return (
        <MenuContext.Provider value={{
            categories
        }}>
            {children}
        </MenuContext.Provider>
    );
};
