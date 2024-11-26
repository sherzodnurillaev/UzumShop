import { useState } from "react";


const Sidebar = ({day, mon, total}) => {

    const tot = total.map((item) => Number(item.price * item.count));
    const totalSum = tot.reduce((acc, num) => acc + num, 0);
    const result = totalSum * 1.2;

    return (
        <>
            <div className="p-[25px]">
                <h1 className="mb-[25px] font-medium">Ваш заказ</h1>

                <div className="flex justify-between">
                    <h2>Товары ({total.length}):</h2>
                    <span className="font-light">{Math.round(result)} sum</span>
                </div>

                <div className="text-center border-[1px] border-[#7000FF] rounded-[2px] my-[10px]">
                    <p className="text-[13px] font-bold text-[#7000FF] py-[2px]">Доставим {day} {mon}</p>
                </div>

                <div className="flex items-center justify-between">
                    <p>Итого:</p>

                    <span className="text-[18px] font-medium">{totalSum} сум</span>
                </div>

                <p className="text-[green] text-[13px] text-right mt-[5px]">Скидка {Math.round(totalSum * 0.2)} so'm</p>

                <button className="text-white text-[18px] text-center w-[100%] font-light bg-[#7000FF] mt-[20px] rounded-[4px] py-[7px]">Переход к оформлению</button>
            </div>
        </>
    )

}

export default Sidebar;
