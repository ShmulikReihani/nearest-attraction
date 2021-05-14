import React, { createContext, useState, useEffect } from 'react'

export const FavoriteCtx = createContext();


export function FavoriteContext({ children }) {

    const initialFavList = () => JSON.parse(window.localStorage.getItem('favListLocal')) || [];
    const [favList, setFavList] = useState(initialFavList);

    useEffect(() => {
        window.localStorage.setItem('favListLocal', JSON.stringify(favList));
    }, [favList])

    return (
        <FavoriteCtx.Provider value={[favList, setFavList]}>
            {children}
        </FavoriteCtx.Provider>
    )
}