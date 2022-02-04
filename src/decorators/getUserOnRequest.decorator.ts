import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetUserOnRequest = createParamDecorator(
  (data, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    const { user } = req;
    return user;
  },
);
