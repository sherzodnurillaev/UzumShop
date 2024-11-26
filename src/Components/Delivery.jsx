

const Delivery = ({total}) => {

    const tot = total.map((item) => Number(item.price * item.count));
    const totalSum = tot.reduce((acc, num) => acc + num, 0);
    const result = Math.round(1000000 - totalSum);
    const res = Math.round(totalSum - 1000000)

    return (
        <>
            <div className="py-[10px] px-[15px]">
                <div className="flex gap-4">
                    <h1 className="text-[16px]">Доставляем заказы до места доставки бесплатно</h1>
                    <svg width="25" height="25" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"  className="ui-icon w-[25px]">
                        <path d="M6 0C9.31371 0 12 2.68629 12 6C12 9.31371 9.31371 12 6 12C2.68629 12 0 9.31371 0 6C0 2.68629 2.68629 0 6 0ZM6 8.5C5.58579 8.5 5.25 8.83579 5.25 9.25C5.25 9.66421 5.58579 10 6 10C6.41421 10 6.75 9.66421 6.75 9.25C6.75 8.83579 6.41421 8.5 6 8.5ZM6 2.5C4.89543 2.5 4 3.39543 4 4.5C4 4.77614 4.22386 5 4.5 5C4.77614 5 5 4.77614 5 4.5C5 3.94772 5.44772 3.5 6 3.5C6.55228 3.5 7 3.94772 7 4.5C7 4.87058 6.91743 5.07932 6.63398 5.39755L6.51804 5.52255L6.25395 5.79209C5.71178 6.36031 5.5 6.76947 5.5 7.5C5.5 7.77614 5.72386 8 6 8C6.27614 8 6.5 7.77614 6.5 7.5C6.5 7.12942 6.58257 6.92068 6.86602 6.60245L6.98196 6.47745L7.24605 6.20791C7.78822 5.63969 8 5.23053 8 4.5C8 3.39543 7.10457 2.5 6 2.5Z" fill="#C2C4CC"></path>
                    </svg>
                </div>
                <div className="pt-[7px]">
                    {totalSum < 1000000 ? (
                        <h2 className="text-[14px] text-[#4d4f59]">До бесплатной доставки курьером осталось <br /> {result} сумов</h2>
                        ) : (
                        <h2 className="text-[14px] text-[#4d4f59]">Доставка бесплатная ваш заказ превышает на <br /> {res} сумов</h2>
                    )}
                </div>
                <div className="flex gap-[2%] py-[7px]">
                    <div className={totalSum > 25000 ? "w-[33%] h-[4px] bg-[#4d4] rounded-[12px]" : "w-[33%] h-[4px] bg-white rounded-[12px]"}>

                    </div>
                    <div className={totalSum > 1000000 ? "w-[65%] h-[4px] bg-[#4d4] rounded-[12px]" : "w-[65%] h-[4px] bg-white rounded-[12px]"}>

                    </div>
                </div>
                <div className="flex w-[100%] gap-[2%]">
                    <div className="flex items-center w-[33%] justify-end">
                        <p className={totalSum > 25000 ? "text-[12px] text-[#4d4]" : "text-[12px] text-[#000]"}>25 000 so'm</p>
                        <img src={totalSum > 25000 ? "/delivery/greenMap.png" : "/delivery/grayMap.png"} alt="" className="w-[20px]" />
                    </div>
                    <div className="flex items-center w-[65%] justify-end">
                        <p className={totalSum > 1000000 ? "text-[12px] text-[#4d4]" : "text-[12px] text-[#000]"}>1 000 000 so'm</p>
                        <img src={totalSum > 1000000 ? "/delivery/greenHome.png" : "/delivery/grayHome.png"} alt="" className="w-[20px]" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Delivery;
