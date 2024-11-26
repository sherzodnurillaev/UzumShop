import { Link } from "react-router-dom";
import "/src/css/Home.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Popular from "../Components/Popular";
import All from "../Components/All";

import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

let sort;

function sorted(fulls) {
    let ty = [];

    fulls.map((full) => {
        let a = full.type;
        ty.push(a);
    });

    sort = [...new Set(ty)];
}

const Home = () => {
    const [datas, setData] = useState([]);
    const [fulls, setFull] = useState([]);
    const [get, setGet] = useState(10);
    const [leng, setLeng] = useState(0);

    useEffect(() => {
        axios('http://localhost:8081/goods')
            .then(res => {
                setData(res.data.slice(0, get));
                setFull(res.data);
                setLeng(res.data.length);
            })
            .catch(err => console.error(err));
    }, [get]);

    function INC() {
        if (get < 50) {
            setGet(get + 10);
        } else if (get === leng || get > leng) {
            setGet(get - leng + 10);
        }
    }

    sorted(fulls);

    return (
        <>
            <div className="container">
                <Swiper className="w-[100%]"
                    // Установите модули Swiper
                    modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
                    spaceBetween={10} // Уменьшаем пространство между слайдами для мобильных
                    slidesPerView={1}
                    // Настройки Autoplay
                    autoplay={{
                        delay: 3000, // Задержка 3 секунды
                        disableOnInteraction: false, // Не останавливать autoplay при взаимодействии
                    }}
                    // Настройки навигации
                    navigation
                    pagination={{ clickable: true }}
                    breakpoints={{
                        // Настройки для разных размеров экранов
                        640: {
                            slidesPerView: 1,
                            spaceBetween: 15,
                        },
                        768: {
                            slidesPerView: 1,
                            spaceBetween: 20,
                        },
                        1024: {
                            slidesPerView: 1,
                            spaceBetween: 30,
                        },
                    }}
                >
                    <SwiperSlide>
                        <img className="Swiper" src="https://images.uzum.uz/cr6t63tbnta1ogm7g750/main_page_banner.jpg" alt="Banner" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img className="Swiper" src="https://images.uzum.uz/cr6t5fdbnta1ogm7g6gg/main_page_banner.jpg" alt="Banner" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img className="Swiper" src="https://images.uzum.uz/cqsrflcsslomdvnkl4o0/main_page_banner.jpg" alt="Banner" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img className="Swiper" src="https://images.uzum.uz/cr5l5eniraat934r0fp0/main_page_banner.jpg" alt="Banner" />
                    </SwiperSlide>
                </Swiper>

                <div className="PopularList">
                    <h1>Популярное</h1>
                    <div className="block">
                        {datas.map((product) => (
                            <Popular key={product.id} data={product} />
                        ))}
                    </div>
                    <div className="btn">
                        <button onClick={INC} className="show-more-btn">
                            {get < 50 ? "Показать еще 10" : "Товары ограничены"}
                        </button>
                    </div>
                </div>

                <div className="img_block">
                    <img src="https://images.uzum.uz/cr6t467iraat934r9jtg/main_page_banner.jpg" alt="Rayxona" />
                </div>

                <All fulls={fulls} sort={sort} />
            </div>
        </>
    );
};

export default Home;
