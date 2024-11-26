import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { productId } from "../../App";


const Search = ({searchProd, searchQuery, clearInpit}) => {
    const { prod, setProd } = useContext(productId);
    const prods = searchProd.filter((prod) => {
        // console.log(prod.type);
        
        return prod.title.toLowerCase().includes(searchQuery.toLowerCase())
    })
    
    
    
    return (
        <>
            <div className="">
                <div className="w-[100%] h-[300px] p-[20px] bg-[#ffffffe2] absolute rounded-b-[20px] overflow-y-auto rounded-t-[2px] z-30">
                    <div className="border-[1px] h-[260px] overflow-auto p-[20px] rounded-[12px]">
                        {
                            prods.map((prod) => {
                            return (
                                <Link to="/Products" key={prod.id}>
                                    <div className="flex gap-[20px] items-center pb-4" onClick={() => {
                                        setProd(prod.id)
                                        clearInpit()
                                        }}>
                                        <img
                                            src="/icons/search.png"
                                            alt="search"
                                            className=""/>
                                        <img src={prod.media[0]} alt="" className="w-[50px] rounded-[12px] border-[1px]" />
                                        <h1 className="text-black text-[16px]">{prod.title.split(' ').slice(0, 2).join  (' ')}... {searchQuery}</h1>
                                    </div>
                                </Link>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Search;
