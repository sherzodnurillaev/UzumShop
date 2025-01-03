import axios from "axios";
import { useEffect, useState } from "react";
import { Formik, Form, Field } from 'formik';
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const id = localStorage.getItem("userId");
    const [user, setUser] = useState(null);

    const navigate = useNavigate()

    useEffect(() => {
        if (id) {
            axios(`http://localhost:8081/Users/${id}`)
                .then((res) => {
                    setUser(res.data);
                })
                .catch((error) => {
                    console.error("Ошибка при получении данных пользователя", error);
                });

            axios.get("http://localhost:8081/goods")
            .then(res => {
                setSearchProd(res.data);
            })
            .catch(error => console.error("Ошибка", error));
        }
    }, [id]);

    const deleteUser = () => {
        axios.delete(`http://localhost:8081/Users/${id}`)
          .then(response => {
            alert("Пользователь успешно удален!");
            console.log(response.data);  // Выводим данные о результате операции
            navigate('/')
          })
          .catch(error => {
            console.error("Ошибка при удалении пользователя:", error);
            alert("Произошла ошибка при удалении пользователя.");
          });
      }
    const home = () => {
        localStorage.clear()
        navigate('/')
      }

    return (
        user ?  <div className="w-[1200px] mx-auto">
        <div className="flex h-[100vh]">
            <div className="w-[200px] border-r-[2px] py-[50px] pr-[20px]">
                <p className="bg-[#5d5dba] mb-[15px] px-[20px] py-[5px] text-[#fff] rounded-[4px] cursor-pointer">Изменить данные</p>
                <p className="bg-[#5d5dba] mb-[15px] px-[20px] py-[5px] text-[#fff] rounded-[4px] cursor-pointer" onClick={deleteUser}>Удалить аккаунт</p>
                <p className="bg-[#5d5dba] mb-[15px] px-[20px] py-[5px] text-[#fff] rounded-[4px] cursor-pointer" onClick={home}>Выход</p>
            </div>
            <div className="p-[50px]">
            <Formik
                initialValues={{ 
                    name: user.name, 
                    email: user.email, 
                    password: user.password, 
                }} // Начальные значения формы
                onSubmit={(values, { setSubmitting }) => {
                    console.log('Форма отправлена:', values);
                    // Отправка данных на сервер
                    axios.put(`http://localhost:8081/Users/${id}`, values)
                        .then(response => {
                            alert("Данные успешно обновлены!");
                        })
                        .catch(error => {
                            console.error("Ошибка при обновлении данных:", error);
                        })
                        .finally(() => {
                            setSubmitting(false); // Отключение состояния загрузки
                        });
                }}
            >
                {({ isSubmitting }) => (
                    <Form style={{width: '800px'}}>
                    <div className="flex justify-center items-center min-h-screen">
                        <div className="flex flex-col justify-center items-center w-full max-w-[220px] gap-2 p-4 bg-white rounded-lg shadow-md">
                            <h1 className="text-left">Изменить данные</h1>
                            <div>
                                {/* <label htmlFor="name">Имя:</label> */}
                                <Field id="name" name="name" placeholder="Введите имя" style={{ border: '1px solid #ccc', padding: '4px', borderRadius: '4px' }} />
                            </div>
                            <div>
                                {/* <label htmlFor="email">Email:</label> */}
                                <Field id="email" name="email" type="email" placeholder="Введите email" style={{ border: '1px solid #ccc', padding: '4px', borderRadius: '4px' }} />
                            </div>
                            <div>
                                {/* <label htmlFor="P">Password:</label> */}
                                <Field id="password" name="password" type="password" placeholder="Введите password" style={{ border: '1px solid #ccc', padding: '4px', borderRadius: '4px' }} />
                            </div>
                            <button type="submit" disabled={isSubmitting} className="w-[100%] bg-[#3d3dd2] h-[33px] text-[#fff] rounded-[4px]">
                                Изменить
                            </button>
                        </div>
                    </div>
                </Form>
                )}
            </Formik>
            </div>
        </div>
    </div> : ''
    )
}

export default Profile;
