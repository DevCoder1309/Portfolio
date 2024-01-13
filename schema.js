const Joi = require("joi");
const AppError = require("./utils/ExpressError");

const validateFeedback = (req, res, next) => {
    const {error} = Joi.object({
        name: Joi.string().required(),
        feedback: Joi.string().required(),
    }).required().validate(req.body);
    if(error){
        const msg = error.map((e) => {
            return e.message
        }).join(",")
        throw new AppError(msg, 400);
    } else {
        next();
    }
};

module.exports = validateFeedback;