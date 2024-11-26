import { Link, useNavigate } from "react-router-dom";
import "/src/css/Product.css";
import { productId } from "../App";
import { useContext, useEffect, useState } from "react";
import axios from "axios";

const Product = () => {
  const { prod, setProd } = useContext(productId);
  const [product, setProduct] = useState({});
  const [media, setMedia] = useState([]);
  const navigate = useNavigate();

  const [types, setTypes] = useState("");
  const [datas, setDatas] = useState([]);
  const [popular, setPopular] = useState([]);
  const [userFavorites, setUserFavorites] = useState([]);
  const [isBasket, setIsBasket] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null);

  const id = localStorage.getItem("userId");

  useEffect(() => {
    if (prod > 0) {
      axios(`http://localhost:8081/goods/${prod}`)
        .then((res) => {
          setProduct(res.data);
          setMedia(res.data.media);
          setTypes(res.data.type);
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      navigate("/");
    }
  }, [prod, navigate]);

  useEffect(() => {
    axios("http://localhost:8081/goods")
      .then((res) => {
        setDatas(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    if (datas.length > 0 && types) {
      // Фильтруем данные по типу
      const filteredPopular = datas.filter((item) => item.type === types);
      setPopular(filteredPopular);
    }
  }, [datas, types]);

  useEffect(() => {
    const id = localStorage.getItem("userId");
    if (id) {
      setCurrentUserId(id);
      axios.get(`http://localhost:8081/Users/${id}`)
        .then(response => {
          const userData = response.data;
          setUserFavorites(userData.favorites || []);
        })
        .catch(error => console.error('Error:', error));

        axios.get(`http://localhost:8081/Basket?userId=${id}`)
    .then(res => {
      // Проверка, что данные от сервера — это массив
      if (Array.isArray(res.data)) {
        setIsBasket(res.data);  // Устанавливаем корзину как массив
      } else {
        console.error("Expected an array, but got:", res.data);
        setIsBasket([]);  // Если данные не массив, инициализируем пустым массивом
      }
    })
    .catch(error => {
      console.error("Error fetching basket:", error);
    });
    }
  }, []);

  const handleHeartClick = (product) => {
    if (currentUserId) {
      const isFavorite = userFavorites.some(item => item.id === product.id);
      const updatedFavorites = isFavorite
        ? userFavorites.filter(item => item.id !== product.id)
        : [...userFavorites, product];

      axios.patch(`http://localhost:8081/Users/${currentUserId}`, { favorites: updatedFavorites })
        .then(() => {
          setUserFavorites(updatedFavorites);
        })
        .catch(error => console.error('Error:', error));
    }
  };

  const handleBasketClick = (item) => {
    if (currentUserId) {
      axios.get(`http://localhost:8081/Basket?userId=${currentUserId}`)
        .then(res => {
          const basketData = res.data;
          const itemInBasket = basketData.find(data => data.id === item.id);
          
          if (itemInBasket) {
            // Если товар уже в корзине, удаляем его
            axios.delete(`http://localhost:8081/Basket/${itemInBasket.id}`)
              .then(() => {
                // После удаления перезапрашиваем корзину
                axios.get(`http://localhost:8081/Basket?userId=${currentUserId}`)
                  .then(res => {
                    setIsBasket(res.data);  // Обновляем состояние корзины
                  });
              })
              .catch(error => {
                console.error("Error removing item from basket:", error);
              });
          } else {
            // Если товара нет в корзине, добавляем его
            const dataToAdd = { userId: currentUserId, ...item, count: 1 };
            axios.post(`http://localhost:8081/Basket`, dataToAdd)
              .then(() => {
                // После добавления перезапрашиваем корзину
                axios.get(`http://localhost:8081/Basket?userId=${currentUserId}`)
                  .then(res => {
                    setIsBasket(res.data);  // Обновляем состояние корзины
                  });
              })
              .catch(error => {
                console.error("Error adding item to basket:", error);
              });
          }
        })
        .catch(error => {
          console.error('Error fetching basket:', error);
        });
    } else {
      console.log("Пользователь не авторизован");
    }
  };

  const isProductInBasket = (productId) => isBasket.some(item => item.id === productId);
  const isProductFavorite = (productId) => userFavorites.some(item => item.id === productId);

  return prod > 0 ? (
    <>
      <div className="max-w-[1200px] mx-auto mt-[50px] p-[0px]">
        <div className="flex gap-[54px] items-center">
          <div className="">
            <img src={media[0]} alt="" className="w-[470px]" />
          </div>
          <div className="max-w-[700px]">
            <h1 className="text-[30px] mb-[26px]">{product.title}</h1>
            <span className="text-[28px]">{product.price} сум</span>
            <hr className="my-[26px]" />
            <p className="w-[500px] text-[14px]">{product.description}</p>
            <div className="flex gap-5 mt-[26px]">
              <button
                className="bg-[#7000FF] border border-[#7000FF] cursor-pointer text-white px-4 py-1 rounded-[8px]"
                onClick={() => handleBasketClick(product)}
              >
                {isProductInBasket(product.id) ? "Удалить из корзины" : "Добавить в корзину"}
              </button>
              <button
                className="text-[#7000FF] border border-[#7000FF] cursor-pointer px-4 py-1 rounded-[8px]"
                onClick={() => handleHeartClick(product)}
              >
                {isProductFavorite(product.id) ? "Удалить из избранного" : "Добавить в избранное"}
              </button>
            </div>
          </div>
        </div>
        <div className="w-[700px] mx-auto my-[80px]">
          <h1 className="text-[21px] mb-[21px]">Описание товара</h1>
          <p className="text-[14px]">{product.description}</p>
        </div>
        <div className="">
          <h1 className="text-[32px] mb-[31px]">Похожие товары</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="flex gap-[40px] overflow-scroll w-[1200px] h-[370px]">
              {popular.map((item) => (
                <div key={item.id} className="boxProduct">
                  <div className="img_box">
                    <img src={item.media[0]} alt={item.title} />
                    <button onClick={() => handleHeartClick(item)}>
                      <img
                        src={isProductFavorite(item.id) ? "/icons/heartActive.png" : "/icons/heart.png"}
                        alt="heart"
                        className="!w-[26px]"
                      />
                    </button>
                  </div>
                  <div className="footer_text">
                    <p>{item.title}</p>
                    <div className="price_config">
                      <span>{item.price} сум</span>
                      <img
                        src={isProductInBasket(item.id) ? "/icons/check.png" : "/icons/basket.png"}
                        alt="basket"
                        onClick={() => handleBasketClick(item)}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  ) : null;
};

export default Product;
