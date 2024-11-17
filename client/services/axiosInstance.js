import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api/",
  withCredentials: true
});

let accessToken = "";

export function setAccessToken(token) {
  accessToken = token; // есть - пользователь авторизирован и у него есть доступ к дейтсвиям
}

// В каждый запрос добавляет HTTP заголовок Authorization
axiosInstance.interceptors.request.use((config) => {
  if (!config.headers.Authorization) {
    // есть ли заголовок с названием Authorization
    config.headers.Authorization = `Bearer ${accessToken}`; 
    //console.log(2222,config.headers.Authorization);

    // создаем заголовок 
    // "Bearer fsdjknfjksdanfjdsnfkjdsfj"
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    // запомнили информацию о прошлом запросе
    const prevRequest = error.config;
    //  проверяем статус и проверка на первичность запроса
    if (error.response.status === 403 && !prevRequest.sent) {
      // делаем запрос на пару токенов
      const response = await axios.get("/api/auth/refresh");
      // достаем токен из ответа
      accessToken = response.data.accessToken;
      //console.log(333,accessToken);
      // и создаем новый ключ и sent для проверки первичности
      prevRequest.sent = true;
      // устанавливаем заголовки
      prevRequest.headers.Authorization = `Bearer ${accessToken}`;
      // делаем повторный запрос
      return axiosInstance(prevRequest);
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;