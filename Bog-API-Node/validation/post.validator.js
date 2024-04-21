const joi = require('joi');
const validateCreatePost = (post) => {
    const schema = joi.object({
        title: joi.string().max(255),
        description: joi.string().min(3).max(1024).required(),
        user: joi.string(),
        image: joi.string().min(6).max(255).required(),


    })
    return schema.validate(post);
};
const validateUpdatePost = (post) => {
    const schema = joi.object({
        title: joi.string().max(255),
        description: joi.string().min(3).max(1024),
        user: joi.string(),
        image: joi.string().min(6).max(255),




    })
    return schema.validate(post);
};
module.exports = {
    validateCreatePost,
    validateUpdatePost
}