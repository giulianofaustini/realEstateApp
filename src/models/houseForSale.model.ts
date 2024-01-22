import mongoose from "mongoose";


const houseForSaleSchema = new mongoose.Schema({
title: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 100,
},
description: {
    type: String,
    required: true,
    unique: true,
    minlength: 10,
    maxlength: 300,
},
price: {
    type: Number,
    required: true,
},
address: {
    type: String,
    required: true,
},
location: {
    type: String,
    required: false,
},
imageUrl: [{
    type: String,
    required: true,
}],
agent: {
    type: String,
    required: true,
},
bedrooms: {
    type: Number,
    required: true,
},
bathrooms: {
    type: Number,
    required: true,
},
addedBy: {
    type: String,
    required: false,
},
userEmail : {
    type: String,
    required: false,
},
userId: {
    type: String,
    required: false,
},
status: {
    type: String,
    required: true,
},
}, { timestamps: true });




const HouseForSale = mongoose.model("HouseForSale", houseForSaleSchema);

export default HouseForSale;