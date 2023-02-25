import mongoose from 'mongoose';

interface IUser {
  name: string;
  about: string;
  avatar: string;
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema<IUser>({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: "Жак-Ив Кусто"
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 200,
    default: "Исследователь"
  },
  avatar: {
    type: String,
    default: "https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png"
  },
  email: {
    type: String,
    // поле обязательно для заполнения, иначе
    // будет выброшена ошибка
    required: true,
    // значение поля должно быть уникально в рамках коллекции,
    // создать двух пользователей с одинковым email не выйдет
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  }
});

export default mongoose.model('user', userSchema)