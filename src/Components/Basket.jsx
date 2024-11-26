import React, { useState } from "react";

const BasketCom = ({ item, removeFromBasket, updateItemCount, total }) => {
    const { id, count, title, colors, media } = item;
    
    // Функция для увеличения количества товара
    const plus = () => {
        updateItemCount(id, count + 1);  // Вызываем функцию обновления
    };

    // Функция для уменьшения количества товара
    const minus = () => {
        if (count > 1) {
            updateItemCount(id, count - 1);  // Вызываем функцию обновления
        }
    };

    // Функция для удаления товара
    const deleted = () => {
        removeFromBasket(id);  // Вызываем функцию удаления
    };

    // console.log(item);
    

    return (
        <div className="border-b-[2px] py-[30px]">
            <div className="flex justify-between items-center">
                <img src={media[0]} alt="" className="w-[200px]" />
                <div className="w-[400px]">
                    <h1>{title}</h1>
                    <div className="flex items-center gap-[20px] pt-[3px]">
                        <p className="text-[gray]">
                            Цвет: {colors.map((color, i) => (
                                <span className="text-[black] font-light" key={i}>
                                    {color} {}
                                </span>
                            ))}
                        </p>
                        <p className="text-[gray]">Скидка: <span className="text-[16px] text-black font-light">20%</span></p>
                    </div>
                    <div className="flex items-center gap-6">
                        <p className="my-[3px] text-[gray]">
                            Рейтинг: <span className="bg-[green] p-[3px] text-[12px] rounded-[50px] text-white" >{item.rating}</span>
                        </p>
                        <p className="text-[gray]">Тип товара: {} 
                            <span className="text-black">{item.type}</span>
                        </p>
                    </div>
                    <div className="flex items-center gap-[20px]">
                    <div className="flex items-center">
                        <span className="mr-[10px] text-[gray]">Цена:</span>
                        <p className="text-[16px]">{item.price} сум</p>
                    </div>
                        <div className="flex justify-between items-center w-[120px] border-[2px] rounded-[12px] px- [10px] py-[7px]">
                            <p className="border-r-[1px] pl-[13px] pr-[13px] cursor-pointer text-[20px] text-[#636262]" onClick={plus}>+</p>
                            <span>{count}</span>
                            <p className="border-l-[1px] pr-[13px] pl-[13px] cursor-pointer text-[20px] text-[#636262]" onClick={minus}>-</p>
                        </div>
                    </div>
                </div>
                <div className="">
                    <div className="flex items-center gap-2 cursor-pointer" onClick={deleted}>
                        <img src="/Basket/del.png" alt="" className="w-[30px] cursor-pointer" />
                        <p className="text-[gray]">Удалить</p>
                    </div>

                    <div className="mt-[15px]">
                        <span className="text-[20px] ">{
                            total = Math.round(item.price * item.count)
                        } {} сум</span>

                        <p className="line-through text-[gray] font-light">{
                            total = Math.round(item.price * item.count * 1.2)
                        } {} сум
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BasketCom;
