import axios from "axios";
import { useEffect, useState } from "react";
import BasketCom from "../Components/Basket";
import Sidebar from "../Components/Zakaz";
import Delivery from "../Components/Delivery";
import BasketNull from "../Components/BasketNull";

const Basket = () => {
    const [bas, setBas] = useState([]);  // Состояние корзины

    const id = localStorage.getItem("userId");

    let [current, setCurrent] = useState(new Date());

    const months = [
        'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
        'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
    ];

    const day = current.getDate() + 1;
    const mon = months[current.getMonth()];

    useEffect(() => {
        // Загружаем данные корзины при монтировании компонента
        axios.get(`http://localhost:8081/Basket`)
            .then(res => {
                const basketData = res.data;
                if (basketData.length > 0) {
                    setBas(basketData);  // Устанавливаем корзину в состояние
                }
            })
            .catch(error => {
                console.error('Ошибка при получении данных корзины', error);
            });
    }, []);

    // Функция для удаления товара из корзины
    const removeFromBasket = (itemId) => {
        axios.delete(`http://localhost:8081/Basket/${itemId}`)
            .then(() => {
                // Обновляем корзину в состоянии родителя
                setBas(prevBasket => prevBasket.filter(item => item.id !== itemId));
            })
            .catch(error => {
                console.error("Ошибка при удалении товара", error);
            });
    };

    // Функция для обновления количества товара
    const updateItemCount = (itemId, newCount) => {
        axios.patch(`http://localhost:8081/Basket/${itemId}`, { count: newCount })
            .then(() => {
                // Обновляем корзину в состоянии родителя
                setBas(prevBasket =>
                    prevBasket.map(item =>
                        item.id === itemId ? { ...item, count: newCount } : item
                    )
                );
            })
            .catch(error => {
                console.error("Ошибка при обновлении количества товара", error);
            });
    };

    return (
        <div className="my-0 mx-auto w-[1200px]">
            <h1 className="text-[30px] font-medium">Ваша корзина</h1>

            <div>
                <h2>Доставим {day} {mon}</h2>
            </div>
            <div className="flex items-start gap-5">
                {
                    bas.length > 0 ? <div className="flex gap-[20px]">
                    {
                        <div className="flex flex-col border-[1px] w-[780px] p-[20px] my-[10px] rounded-[4px]">
                            {bas.map(item => (
                            <BasketCom
                                key={item.id}
                                item={item}
                                removeFromBasket={removeFromBasket}  // Передаем функцию удаления
                                updateItemCount={updateItemCount}    // Передаем функцию обновления количества
                            />
                        ))}
                        </div>
                    }
                    <div className="sticky top-0 h-[100%] mb-[10px]">
                        <div className="border-[1px] w-[400px] mt-[10px] rounded-[4px]">
                            <Sidebar day={day} mon={mon} total={bas}/>
                        </div>
                        <div className="bg-[#e5e5e5] w-[400px] mt-[10px] rounded-[12px]">
                            <Delivery total={bas}/>
                        </div>
                    </div>
                </div> : <BasketNull/>
                }
            </div>
        </div>
    );
}

export default Basket;
