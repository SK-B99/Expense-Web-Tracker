
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export interface RequestUser {
  id: number;
  name: string;
  email: string;
}

export const CurrentUser = createParamDecorator(
  (_: unknown, ctx: ExecutionContext): RequestUser => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);