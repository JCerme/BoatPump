import mongoose from 'mongoose';

// USERS SCHEMA
const userSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: {
        type: String,
        unique: true,
        index: true,
    },
    password: String,
    role: {
        type: String,
        enum : ['user','admin'],
        default: 'user'
    },
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'carts',
    },
});

mongoose.set('strictQuery', false);
const usersModel = mongoose.model('users', userSchema);
export default usersModel;
