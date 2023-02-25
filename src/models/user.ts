import mongoose from 'mongoose';
import bcrypt from "bcrypt";

interface IUser {
  name: string;
  about: string;
  avatar: string;
  email: string;
  password: string;
}

interface UserModel extends mongoose.Model<IUser> {
  findUserByCredentials: (email: string, password: string) => Promise<mongoose.Document<unknown, any, IUser>>
}

const userSchema = new mongoose.Schema<IUser, UserModel>({
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
    minlength: 8,
    select: false // необходимо добавить поле select
  }
});

// добавим метод findUserByCredentials схеме пользователя
// у него будет два параметра — почта и пароль
userSchema.static('findUserByCredentials', function findUserByCredentials(email: string, password: string) {
  return this.findOne({ email }).select("+password")
     .then((user) => {
        if (!user) {
           return Promise.reject(new Error("Неправильные почта или пароль"))
        }

        return bcrypt
           .compare(password, user.password)
           .then((matched) => {
              if (!matched) {
                 return Promise.reject(new Error("Неправильные почта или пароль"))
              }

              return user
           })
     })
})

export default mongoose.model<IUser, UserModel>('user', userSchema)