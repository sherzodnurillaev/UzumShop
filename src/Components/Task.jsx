import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "/src/css/Product.css";
import { productId } from "../App";
import axios from "axios";

const Task = ({ randomArr, datas }) => {
    const { prod, setProd } = useContext(productId);
    const [prods, setProds] = useState([]); // Состояние для нескольких продуктов
    const [favorites, setFavorites] = useState({}); // Состояние для избранных товаров (ключ — id продукта, значение — true/false)
    const [basket, setBasket] = useState({}); // Состояние для корзины (ключ — id продукта, значение — true/false)
    const userId = localStorage.getItem("userId"); // Или получите id из контекста или props

    useEffect(() => {
        const foundProducts = datas.filter(data => randomArr.includes(+data.id));
        setProds(foundProducts);

        // Если пользователь авторизован, нужно получить его избранные товары и корзину
        if (userId) {
            axios.get(`http://localhost:8081/Users/${userId}`)
                .then(response => {
                    const userData = response.data;
                    const favoriteItems = Array.isArray(userData.favorites) ? userData.favorites : [];
                    const basketItems = Array.isArray(userData.basket) ? userData.basket : [];

                    // Создаем объект с избранными товарами
                    const favoritesMap = favoriteItems.reduce((acc, item) => {
                        acc[item.id] = true;
                        return acc;
                    }, {});

                    // Создаем объект с товарами в корзине
                    const basketMap = basketItems.reduce((acc, item) => {
                        acc[item.id] = true;
                        return acc;
                    }, {});

                    setFavorites(favoritesMap);
                    setBasket(basketMap);
                })
                .catch(error => console.error('Error fetching user data:', error));
        }
    }, [datas, randomArr, userId]);

    const handleHeartClick = (e, prod) => {
        e.stopPropagation();

        if (userId) {
            axios.get(`http://localhost:8081/Users/${userId}`)
                .then(response => {
                    const userData = response.data;
                    const favoriteItems = Array.isArray(userData.favorites) ? userData.favorites : [];

                    const isProductFavorite = favoriteItems.some(item => item.id === prod.id);

                    let updatedFavorites;
                    if (isProductFavorite) {
                        updatedFavorites = favoriteItems.filter(item => item.id !== prod.id);
                    } else {
                        updatedFavorites = [...favoriteItems, prod];
                    }

                    return axios.patch(`http://localhost:8081/Users/${userId}`, { favorites: updatedFavorites });
                })
                .then(() => {
                    setFavorites(prevFavorites => {
                        const newFavorites = { ...prevFavorites };
                        if (newFavorites[prod.id]) {
                            delete newFavorites[prod.id]; 
                        } else {
                            newFavorites[prod.id] = true; 
                        }
                        return newFavorites;
                    });
                })
                .catch(error => console.error('Error:', error));
        }
    };

    const handleBasketClick = (e, prod) => {
        e.stopPropagation();

        if (userId) {
            axios.get(`http://localhost:8081/Basket?userId=${userId}`)
                .then(res => {
                    const basketData = res.data;
                    const itemInBasket = basketData.find(item => item.id === prod.id);

                    let updatedBasket;
                    if (itemInBasket) {
                        // Если товар уже в корзине, удаляем его
                        updatedBasket = basketData.filter(item => item.id !== prod.id);
                        return axios.delete(`http://localhost:8081/Basket/${itemInBasket.id}`);
                    } else {
                        // Если товара нет в корзине, добавляем его
                        updatedBasket = [...basketData, { userId: userId, ...prod, count: 1 }];
                        return axios.post(`http://localhost:8081/Basket`, { userId: userId, ...prod, count: 1 });
                    }
                })
                .then(() => {
                    setBasket(prevBasket => {
                        const newBasket = { ...prevBasket };
                        if (newBasket[prod.id]) {
                            delete newBasket[prod.id]; // Убираем из корзины
                        } else {
                            newBasket[prod.id] = true; // Добавляем в корзину
                        }
                        return newBasket;
                    });
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        } else {
            console.log("Пользователь не авторизован");
        }
    };

    if (prods.length === 0) {
        return <h1>Продукты не найдены</h1>;
    }

    return (
        <div className="grid grid-cols-5 gap-[20px] w-[1200px] ">
            {prods.map((prod) => (
                <div className="boxProduct" key={prod.id}>
                    <Link to={`/Products`}>
                        <div className="img_box mr-3" onClick={() => setProd(prod.id)}>
                            <img src={prod.media[0]} alt={prod.title} />
                        </div>
                        <div className="footer_text">
                            <p>{prod.title}</p>
                            <div className="price_config">
                                <span>{prod.price} сум</span>
                            </div>
                        </div>
                    </Link>

                    <button onClick={(e) => handleHeartClick(e, prod)}>
                        <img 
                            src={favorites[prod.id] ? "/icons/heartActive.png" : "/icons/heart.png"} 
                            alt="heart" 
                        />
                    </button>

                    <img
                        src={basket[prod.id] ? "/icons/check.png" : "/icons/basket.png"}
                        alt="basket"
                        className="basket"
                        onClick={(e) => handleBasketClick(e, prod)}
                    />
                </div>
            ))}
        </div>
    );
};

export default Task;
