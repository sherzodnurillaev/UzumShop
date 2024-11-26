import axios from "axios";
import { useEffect, useState } from "react";
import Task from "./Task";

const Random = () => {
    const [data, setData] = useState([]); // Состояние для данных с сервера
    const [randomArray, setRandomArray] = useState([]); // Состояние для случайных чисел
    const [loading, setLoading] = useState(true); // Стейт загрузки данных

    function generateRandomNumbers() {
        const randomNumbers = [];
        
        while (randomNumbers.length < 10) {
            const randomNumber = Math.floor(Math.random() * 50) + 1;
            if (!randomNumbers.includes(randomNumber)) {
                randomNumbers.push(randomNumber);
            }
        }

        setRandomArray(randomNumbers); 
    }

    useEffect(() => {
        generateRandomNumbers();

        axios.get("http://localhost:8081/goods")
            .then(res => {
                setData(res.data);
                setLoading(false); 
            })
            .catch(err => {
                console.log("Товар не найден", err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Загрузка...</div>;
    }

    return (
        <>
            <Task randomArr={randomArray} datas={data} />
        </>
    );
};

export default Random;
