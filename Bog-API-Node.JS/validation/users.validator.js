const joi = require('joi');
const validateCreateUser = (user) => {
    const schema = joi.object({
        name: joi.string().min(3).max(50).required(),
        email: joi.string().email({
            tlds: {
                allow: false
            }
        }).required(),
        image: joi.string().min(6).max(255),
        password: joi.string().min(6).max(255).required(),
       

    })
    return schema.validate(user);
};
const validateUpdateUser = (user) => {
    const schema = joi.object({
        name: joi.string().min(3).max(50),
        email: joi.string().email({
            tlds: {
                allow: false
            }
        }),
        image: joi.string().min(6).max(255),
        password: joi.string().min(8).max(255),
       

    })
    return schema.validate(user);
};
module.exports = {
    validateCreateUser,
    validateUpdateUser
}