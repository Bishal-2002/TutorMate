const mongoose=require('mongoose')
const Review=require('./review')
const Schema=mongoose.Schema;
const {cloudinary}=require('../cloudinary')

const ImageSchema=new Schema({
    url: String,
    filename: String
})

// ImageSchema.virtual('thumbnail').get(function () {
//     return this.url.replace('/upload', '/upload/w_200');
// });

const TutorSchema=new Schema({
    title: String,
    subjects: [String],
    // images: [ImageSchema],
    price: Number,
    description: String,
    address: String,
    city: String,
    country: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
})


TutorSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await Review.deleteMany({
            _id: {
                $in: doc.reviews
            }
        })
        // for(let image of doc.images){
        //     cloudinary.uploader.destroy(image.filename)
        // }
    }
})

module.exports=mongoose.model('Tutor',TutorSchema)