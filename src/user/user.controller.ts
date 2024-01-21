import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get(':id')
  async getUser(@Param('id') id: number) {
    const user = await this.userService.findById(id);
    const { password, ...result } = user;
    if (password) delete user.password;
    return result;
  }
}
