
const BasketModal = ({data, removeFromBasket}) => {
    const { id, count, title, colors, media } = data;

        const deleted = () => {
            removeFromBasket(id);  // Вызываем функцию удаления
        };
    
    return (
        <>
            <div className="flex items-center w-[300px] mb-[10px] hover:bg-gray-300 rounded-[8px]">
                <img src={data.media[0]} alt="" className="w-[50px] rounded-[8px] mr-2" />
                <div className="leading-4 mr-[10px]">
                    <h1 className="text-[#000] text-[14px] w-[200px] overflow-hidden whitespace-nowrap ">{data.title}</h1>
                    <span className="text-[16px]">{data.price} сум</span>
                </div>
                <img src="/Basket/del.png" alt="" className="w-[20px] mb-[15px]" onClick={deleted}/>
            </div>
        </>
    )
}

export default BasketModal;
