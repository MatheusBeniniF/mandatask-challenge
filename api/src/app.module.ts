import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './modules/auth/index.module';
import { TaskModule } from './modules/task/index.module';
import { UserModule } from './modules/user/index.module';
import { JwtMiddleware } from './middlewares/auth/index.middleware';
import { JwtAuthService } from './services/auth/index.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [AuthModule, TaskModule, UserModule],
  controllers: [AppController],
  providers: [JwtAuthService, JwtService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtMiddleware)
      .exclude({
        path: 'login',
        method: RequestMethod.POST,
      })
      .forRoutes('*');
  }
}
