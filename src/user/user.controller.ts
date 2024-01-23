import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(JwtGuard)
  @Get(':id')
  async getUser(@Param('id') id: number) {
    const user = await this.userService.findById(id);
    const { password, ...result } = user;
    if (password) delete user.password;
    return result;
  }
}
