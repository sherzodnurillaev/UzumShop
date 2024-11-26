import { useContext, useEffect, useState } from "react";
import "/src/css/Product.css";
import { productId } from "../App";
import { Link } from "react-router-dom";
import axios from "axios";

const Popular = ({ data }) => {
  const { prod, setProd } = useContext(productId);
  const [isFavorite, setIsFavorite] = useState([]);
  const [isBasket, setIsBasket] = useState([]);
  const id = localStorage.getItem("userId");

  useEffect(() => {
      if (id) {
          // Получаем данные о пользователе для избранного и корзины
          axios.get(`http://localhost:8081/Users/${id}`)
              .then(response => {
                  const userData = response.data;
                  const favoriteItems = Array.isArray(userData.favorites) ? userData.favorites : [];
                  setIsFavorite(favoriteItems); // Инициализируем состояние избранного
              })
              .catch(error => console.error('Error:', error));

          axios.get(`http://localhost:8081/Basket?userId=${id}`)
              .then(res => {
                  if (Array.isArray(res.data)) {
                      setIsBasket(res.data);  // Устанавливаем корзину как массив
                  } else {
                      console.error("Expected an array, but got:", res.data);
                      setIsBasket([]);  // Если данные не массив, инициализируем пустым массивом
                  }
              })
              .catch(error => console.error('Error:', error));
      }
  }, [id, data.id]);

  // Обработка клика по кнопке "Сердце" для избранного
  const handleHeartClick = async (prod) => {
      if (id) {
          try {
              // Получаем текущие избранные товары пользователя
              const userData = await axios.get(`http://localhost:8081/Users/${id}`);
              const favoriteItems = Array.isArray(userData.data.favorites) ? userData.data.favorites : [];

              // Проверяем, находится ли товар в избранном
              const isProductFavorite = favoriteItems.some(item => item.id === prod.id);

              let updatedFavorites;
              if (isProductFavorite) {
                  // Если товар уже в избранном, удаляем его
                  updatedFavorites = favoriteItems.filter(item => item.id !== prod.id);
              } else {
                  // Если товара нет в избранном, добавляем его
                  updatedFavorites = [...favoriteItems, prod];
              }

              // Отправляем обновлённый список избранных товаров на сервер
              await axios.patch(`http://localhost:8081/Users/${id}`, { favorites: updatedFavorites });

              // Обновляем состояние избранного
              setIsFavorite(updatedFavorites);
          } catch (error) {
              console.error('Error:', error);
          }
      }
  };

  // Обработка клика по кнопке "Корзина"
  const handleBasketClick = async (item) => {
      if (id) {
          try {
              const basketData = await axios.get(`http://localhost:8081/Basket?userId=${id}`);
              const itemInBasket = basketData.data.find(data => data.id === item.id);
              
              if (itemInBasket) {
                  // Если товар уже в корзине, удаляем его
                  await axios.delete(`http://localhost:8081/Basket/${itemInBasket.id}`);
                  const updatedBasket = await axios.get(`http://localhost:8081/Basket?userId=${id}`);
                  setIsBasket(updatedBasket.data);  // Обновляем корзину после удаления
              } else {
                  // Если товара нет в корзине, добавляем его
                  const dataToAdd = { userId: id, ...item, count: 1 };
                  await axios.post(`http://localhost:8081/Basket`, dataToAdd);
                  const updatedBasket = await axios.get(`http://localhost:8081/Basket?userId=${id}`);
                  setIsBasket(updatedBasket.data);  // Обновляем корзину после добавления
              }
          } catch (error) {
              console.error("Error managing basket:", error);
          }
      } else {
          console.log("Пользователь не авторизован");
      }
  };

  const isProductInBasket = (productId) => isBasket.some(item => item.id === productId);
  const isProductFavorite = (productId) => isFavorite.some(item => item.id === productId);

  return (
      <div className="boxProduct relative">
          <Link to="/Products">
              <div className="" onClick={() => setProd(data.id)}>
                  <div className="img_box">
                      <img src={data.media[0]} alt={data.title} />
                  </div>
                  <div className="footer_text">
                      <p>{data.title}</p>
                      <div className="price_config">
                          <span>{data.price} сум</span>
                      </div>
                  </div>
              </div>
          </Link>
          <button onClick={() => handleHeartClick(data)} className="absolute top-2 right-2">
              <img
                  src={isProductFavorite(data.id) ? "/icons/heartActive.png" : "/icons/heart.png"}
                  alt="heart"
              />
          </button>
          <img
              src={isProductInBasket(data.id) ? "/icons/check.png" : "/icons/basket.png"}
              alt="basket"
              className="basket absolute bottom-2 right-2"
              onClick={() => handleBasketClick(data)}
          />
      </div>
  );
};

export default Popular;
