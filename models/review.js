const mongoose=require('mongoose')
const Schema=mongoose.Schema
const reviewSchema=new Schema({
    body: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    rating: Number
})
module.exports=mongoose.model('Review', reviewSchema)