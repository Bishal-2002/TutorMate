const Joi=require('joi')

module.exports.tutorSchema=Joi.object({
    tutor: Joi.object({
        title: Joi.string().required(),
        subjects: Joi.array().required(),
        price: Joi.number().required().min(0),
        address: Joi.string().required(),
        city: Joi.string().required(),
        country: Joi.string().required(),
        description: Joi.string().required()
    }).required()
})

module.exports.reviewSchema=Joi.object({
    review: Joi.object({
        body: Joi.string().required(),
        rating: Joi.number()
    }).required()
})