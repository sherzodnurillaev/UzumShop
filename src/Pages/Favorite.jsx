import { useEffect, useState } from "react";
import FavoriteNull from "../Components/FavoriteNull"
import Favorites from "../Components/Favorites"
import axios from "axios";
import Random from "../Components/Random";


const Favorite = () => {
    const [fav, setFav] = useState(null)

    const id = localStorage.getItem("userId");

    useEffect(() => {
        axios.get(`http://localhost:8081/Users/${id}`)
        .then(res => {
            const a = res.data
            const data = a.favorites
            if (data.length > 0) {
                setFav(data)
            }
        })
    }, []) 
    return (
        <>
        <div className="PopularList w-[1200px] mx-auto">
            <h1 className="text-[32px] mt-[52px] mb-[31px]">{fav != null ? "Избранное" : ""}</h1>
            <div className="grid grid-cols-5 gap-[20px] mb-[100px]">
                {
                    fav != null ? (
                        fav.map((data) => (
                            <Favorites key={data.id} data={data} />
                        ))
                    ) : (
                        <FavoriteNull />
                    )
                }
            </div>

            <div className="">
                <h2 className="text-[32px] mt-[52px] mb-[31px]">Также посмотрите эти товары</h2>
                <Random />
            </div>
        </div>
        </>
    )
}

export default Favorite
