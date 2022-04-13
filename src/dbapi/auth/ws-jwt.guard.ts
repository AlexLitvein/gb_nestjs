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
        client.handshake.headers.authorization.split(' ')[1];

      const session = await this.sessionsService.getByToken(authToken);
      if (session) {
        context.switchToWs().getClient().data.user = session.userId;
        return true;
      }

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
  }
}
