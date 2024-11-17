import { useEffect, useState } from 'react'
import UserCard from "./UserCard"


export default function UserList() {
  const [users, setUsers] = useState([])
  const [editUser, setEditUser] = useState(null)
  const [formData, setFormData] = useState( {
    name: "",
    email: "", 
    password: "",
  })

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/users")
        const data = await res.json()
        setUsers(data)
      } catch (error) {
        res.status(500).json({message: error.message})
      }
    }
    fetchUsers()
  }, [])

  // Функция для сохранения изменений пользователя
  const saveClick = async() => {
    try {
        const response = await fetch(`/api/users/${editUser.id}`,{
            method:'PUT',  // Указываем метод PUT для обновления данных на сервере
            headers:{'Content-Type':'application/json'},  // Устанавливаем заголовок для отправки JSON-данных
            body:JSON.stringify(formData), // Преобразуем данные формы в JSON и отправляем их в теле запроса
        })
        const updatedUser = await response.json()

// Обновляем список пользователей с измененными данными пользователя
        setUsers(users.map((user)=>(user.id===updatedUser.id ? updatedUser : user)));
        setEditUser(null); // Сбрасываем состояние editingUser, так как редактирование завершено
        setFormData({name:'',email:'',password:''}); // Очищаем форму
    } catch (error) {
        console.error("Error updating user:", error);
    }
  }

  const change = (e) => {
    setFormData({...formData, [e.target.name]:e.target.value}) // Обновляем значение поля в formData, основанное на имени целевого элемента
  }
  
  return (
    <div>
      <h2>Users</h2>
      
      {editUser && ( // Проверяем, есть ли пользователь для редактирования
        <form>
          <input
            type="email"
            name="email" // Указываем имя поля
            value={formData.email} // Устанавливаем значение из состояния formData
            onChange={change} // Привязываем обработчик изменения
            placeholder="Email" // Плейсхолдер для поля
          />
          <input
            type="password"
            name="password" // Указываем имя поля
            value={formData.password} // Устанавливаем значение из состояния formData
            onChange={change} // Привязываем обработчик изменения
            placeholder="Password" // Плейсхолдер для поля
          />
          <button type="button" onClick={saveClick}> 
            Сохранить
          </button>
        </form>
      )}
      <div className="user-list">
        {users.map((user) => ( // Проходим по массиву users и отображаем UserCard для каждого пользователя
          <UserCard
            key={user.id} // Уникальный ключ для каждого элемента списка
            userProp={user}
            setUsers={setUsers} // Передаем функцию setUsers для обновления состояния
            onEdit={() => editClick(user)} // Передаем функцию для редактирования пользователя
          />
        ))}
      </div>
    </div>
  )
}