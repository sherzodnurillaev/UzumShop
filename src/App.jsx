import { Route, Routes } from 'react-router-dom'
import { lazy, Suspense, useState } from 'react'
import './App.css'


const Layoute = lazy(() => import('./Layout/Layout'));
const HomePage = lazy(() => import('./Pages/Home'));
const ProductPage = lazy(() => import('./Pages/Products'));
const SignPage = lazy(() => import('./Pages/Sign'));
const FavoritePage = lazy(() => import('./Pages/Favorite'));
const BasketPage = lazy(() => import('./Pages/Basket'));
const ProfilePage = lazy(() => import('./Pages/Profile'));

import { createContext } from 'react';

export const productId = createContext(0);
export const States = createContext(false);

function App() {
  const [prod, setProd] = useState({id: 0})
  const [state, setState] = useState()
  return (
    <>
    <productId.Provider value={{prod, setProd}} >
    <States.Provider value={{state, setState}} >
      <Suspense fallback={<h1>Loading...</h1>}>
        <Routes>
          <Route path='/Sign' element={<SignPage />}/>
          <Route path='/' element={<Layoute />}>
              <Route index element={<HomePage />} />
              <Route path='Products' element={<ProductPage />} />
              <Route path='Favorite' element={<FavoritePage />} />
              <Route path='Basket' element={<BasketPage />} />
          </Route> 
              <Route path='Profile' element={<ProfilePage />} />
        </Routes>
      </Suspense>
    </States.Provider>
    </productId.Provider>
    </>
  )
}

export default App
