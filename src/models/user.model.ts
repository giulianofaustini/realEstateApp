import mongoose  from "mongoose";


const userSchema = new mongoose.Schema({
    
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 3,
        maxlength: 30,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 3,
        maxlength: 30,
    },
    password: {
        type: String,
        required: true,
        minlength: 3
    },
    
    isAdmin: {
        type: Boolean,
        required: false,
    },


}, { timestamps: true });


const User = mongoose.model("User", userSchema);

export default User;