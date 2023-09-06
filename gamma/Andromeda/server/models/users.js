const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        min: 3,
        max: 20
    },
    top3:{
        type:Array,
        default: [],
        require:false
    },
    phone: {
        type: String,
        require: true,
        max: 10
    },
    age: {
        type: String,
        require: true,
        max: 10
    },
    gender: {
        type: String,
        require: true,
        max: 10
    },
    nationality: {
        type: String,
        require: true,
        max: 10
    },
    address: {
        type: String,
        require: true,
        max: 100
    },
    email: {
        type: String,
        require: true,
        max: 50,
        unique: true  
    },
    password: {
        type: String,
        require: true,
        min: 8,
        max: 30
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    cart: {
        orderNumber: {
            type: String,
        },
        items: {
            type: Array,
            required: true
        },
        total: {
            type: Number,
            default: 0
        },
    },
    rated: {
        type: Array,
        default: []
    },
    interacted: {
        type: Array,
        default: []
    },
    userindex: {
        type: Number,
        required: true
    },
    wishlist: {
        items: {
            type: Array,
            default: [],
            required: true
        },
    }    
},
{ timestamps: true }
);

const Users = mongoose.model("Users", userSchema);
module.exports = Users;


