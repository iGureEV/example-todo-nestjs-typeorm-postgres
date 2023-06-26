import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.group(`Запрос ${Date.now()}`);
    console.log(`URL: ${req.url}`);
    console.log(`params: ${req.params}`);
    console.log(`body: ${req.body}`);
    console.groupEnd();
    next();
  }
}
