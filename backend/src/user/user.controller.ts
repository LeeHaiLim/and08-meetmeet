import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { GetUser } from 'src/auth/get-user.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UpdateUserInfoDto } from './dto/update-user-info.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@ApiBearerAuth()
@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('info')
  @ApiOperation({
    summary: '사용자 프로필 조회 API',
    description: 'kakao 회원의 경우 email에 kakao라고 조회됩니다.',
  })
  getUserInfo(@GetUser() user: User) {
    return this.userService.getUserInfo(user);
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('profile'))
  @Patch('info')
  @ApiOperation({
    summary: '사용자 닉네임, 프로필 사진 수정 API',
  })
  @ApiConsumes('multipart/form-data')
  updateUserInfo(
    @UploadedFile() profileImage: Express.Multer.File,
    @GetUser() user: User,
    @Body() updateUserDto: UpdateUserInfoDto,
  ) {
    console.log(profileImage);
    return this.userService.updateUserInfo(user, updateUserDto, profileImage);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('account')
  @ApiOperation({
    summary: '사용자 계정(password) 수정 API',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        password: {
          type: 'string',
          description: '변경할 password',
        },
      },
    },
  })
  updateUserPassword(
    @GetUser() user: User,
    @Body('password') password: string,
  ) {
    return this.userService.updateUserPassword(user, password);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  @ApiOperation({
    summary: '사용자 탈퇴 API',
    description: 'parameter의 id와 access token의 user id가 같아야 합니다.',
  })
  deleteUser(@GetUser() user: User) {
    return this.userService.deleteUser(user);
  }
}
