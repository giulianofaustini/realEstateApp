import mongoose from "mongoose";


const houseForRentSchema = new mongoose.Schema({
title: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 30,
},
description: {
    type: String,
    required: true,
    unique: true,
    minlength: 10,
    maxlength: 100,
},
monthlyRent: {
    type: Number,
    required: true,
},
rentalDeposit: {
    type: Number,
    required: true,
},
address: {
    type: String,
    required: true,
},
location: {
    type: String,
    required: true,
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
}, { timestamps: true });




const HouseForRent = mongoose.model("HouseForRent", houseForRentSchema);

export default HouseForRent;

