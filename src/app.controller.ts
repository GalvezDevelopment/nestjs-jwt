import { Body, Controller, Delete, Get, Post, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateUser } from './dto/create-user.dto';
import { Login } from './dto/login.dto';
import { UserService } from './services/user/user.service';
import { User } from './interfaces/user.interface';
import { AuthGuard } from './guards/auth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private userSrv: UserService) {}

  @Get('users')
  users(): User[] {
    return this.userSrv.all();
  }

  @Post('signup')
  async signup(@Body() createUser: CreateUser): Promise<string> {
    return this.userSrv.register(createUser);
  }

  @Post('login')
  login(@Body() login: Login): Promise<boolean> {
    return this.userSrv.login(login);
  }

  @Delete('removeAll')
  removeAll(): void {
    this.userSrv.removeAll();
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(): boolean {
    return true;
  }
}
