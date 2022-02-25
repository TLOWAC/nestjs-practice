import * as Joi from 'joi';

export const validationEnvSchema = Joi.object({
  NODE_ENV: Joi.string().valid('local', 'dev', 'prod', 'test'),
  PORT: Joi.number().default(3000),
});
