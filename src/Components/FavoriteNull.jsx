import { useNavigate } from "react-router-dom"


const FavoriteNull = () => {
    const navigate = useNavigate();
    return (
        <>
        <div className="w-[1200px] mx-auto">
            <div className="w-[400px] mx-auto text-center mt-[200px]">
                <img src="/null.png" alt="" className="w-[100px] mx-auto" />
                <h1 className="text-[26px] font-bold mt-[20px] mb-[11px]">Добавьте то, что понравилось</h1>
                <p className="text-[12px]">Перейдите на главную страницу и нажмите на ♡ в товаре</p>
                <button className="bg-[#7000FF] text-white px-[30px] py-[7px] rounded-[8px] mt-[20px]" onClick={() => navigate("/")}>На главную</button>
            </div>
        </div>
        </>
    )
}

export default FavoriteNull
