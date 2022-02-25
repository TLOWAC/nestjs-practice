import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Cookie = createParamDecorator((data, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest();
  const { cookie } = req;
  return cookie;
});
