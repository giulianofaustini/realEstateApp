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
        default: false,
        required: false,
    },
    avatar: {
        type: String,
        required: false,
        default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
    },


}, { timestamps: true });


const User = mongoose.model("User", userSchema);

export default User;

