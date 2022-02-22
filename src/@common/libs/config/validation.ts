import * as Joi from 'joi';

export const validationEnvSchema = Joi.object({
  NODE_ENV: Joi.string().valid('local', 'development', 'production', 'test'),
  PORT: Joi.number().default(3000),
});
