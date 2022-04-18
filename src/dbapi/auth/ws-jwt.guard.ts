import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { SessionsService } from '../modules/sessions/sessions.service';
// import { AuthService } from './auth.service';

@Injectable()
export class WsJwtGuard implements CanActivate {
  constructor(
    // private authService: AuthService,
    private readonly sessionsService: SessionsService,
  ) {}

  async canActivate(context: ExecutionContext) {
    try {
      // Особым образом извлекаем информацию о клиенте
      const client = context.switchToWs().getClient();
      // Извлекаем токен
      const authToken: string =
        // client.handshake.headers.authorization.split(' ')[1];
        client.handshake.headers.authorization;

      const session =
        authToken && (await this.sessionsService.getByToken(authToken));
      if (session) {
        const comment = context.getArgByIndex(1);
        comment.user = session.user;

        context.switchToWs().getClient().data.user = session.userId;
        return true;
      }

      //   const err = new Error('not authorized');
      //   throw new UnauthorizedException(err);

      // Вызываем метод проверки токена из сервиса authService
      //   const isAuth = await this.authService.verify(authToken);
      //   if (isAuth) {
      //     // Декодируем токен и извлекаем информацию о пользователе
      //     const user = await this.authService.decode(authToken);
      //     // Информацию о пользователе записываем в поле data нашего клиента
      //     context.switchToWs().getClient().data.user = user;
      //     return true;
      //   }

      return false;
    } catch {
      return false;
    }
    // finally {
    //   return false;
    // }
  }
}
