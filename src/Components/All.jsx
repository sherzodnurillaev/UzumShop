import Audio from "./all/audio";
import Furniture from "./all/furniture";
import Kitchen from "./all/Kitchen";
import PC from "./all/PC";
import TV from "./all/TV";
import "/src/css/Product.css";

const All = ({ fulls, sort }) => {

    return (
        <>
        <div className="furniture">
                    <h1>{sort[0]}</h1>
                    <div className="furnitur">
                    {
                        fulls.map((product) => (
                            <Furniture key={product.id} data={product} sort={sort} />
                        ))
                    }
                    </div>
                </div>
                <div className="img_block my-[40px]">
                    <img src="https://images.uzum.uz/crkkq5pbjcvd8a773k50/main_page_banner.jpg" alt="Rayxona" />
                </div>

                <div className="furniture">
                    <h1>{sort[1]}</h1>
                    <div className="furnitur">
                    {
                        fulls.map((product) => (
                            <PC key={product.id} data={product} sort={sort} />
                        ))
                    }
                    </div>
                </div>
                <div className="furniture">
                    <h1>{sort[2]}</h1>
                    <div className="furnitur">
                    {
                        fulls.map((product) => (
                            <Audio key={product.id} data={product} sort={sort} />
                        ))
                    }
                    </div>
                </div>

                <div className="img_block my-[40px]">
                    <img src="https://images.uzum.uz/crlc8foj5no2jr72qbn0/main_page_banner.jpg" alt="Rayxona" />
                </div>

                <div className="furniture">
                    <h1>{sort[3]}</h1>
                    <div className="furnitur">
                    {
                        fulls.map((product) => (
                            <TV key={product.id} data={product} sort={sort} />
                        ))
                    }
                    </div>
                </div>
                <div className="furniture">
                    <h1>{sort[4]}</h1>
                    <div className="furnitur">
                    {
                        fulls.map((product) => (
                            <Kitchen key={product.id} data={product} sort={sort} />
                        ))
                    }
                    </div>
                </div>
        </>
    );
}

export default All;
