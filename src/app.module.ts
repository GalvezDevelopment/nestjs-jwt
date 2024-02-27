import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserService } from './services/user/user.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstant } from './constants';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: jwtConstant.secret,
      signOptions: { 
        expiresIn: '120s'
      }
    })
  ],
  controllers: [AppController],
  providers: [
    AppService, 
    UserService
  ],
})
export class AppModule {}
