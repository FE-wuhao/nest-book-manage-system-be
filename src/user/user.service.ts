import { BadRequestException, Injectable } from '@nestjs/common'
import { RegisterUserDto } from './dto/register-user.dto'
import { DbService } from 'src/db/db.service'
import { User } from './entities/user.entity'
import { LoginUserDto } from './dto/login.dto'

@Injectable()
export class UserService {
  constructor(private readonly dbService: DbService) {}

  async register(registerUserDto: RegisterUserDto) {
    const users = await this.dbService.read()

    const isUserExist = users.some(user => user.username === registerUserDto.username)

    if (isUserExist) {
      throw new BadRequestException('用户已存在')
    }

    const newUser = new User()

    newUser.username = registerUserDto.username
    newUser.password = registerUserDto.password

    users.push(newUser)

    this.dbService.write(users)
    return newUser
  }

  async login(loginUserDto: LoginUserDto) {
    const users = await this.dbService.read()
    const user = users.find(user => user.username === loginUserDto.username)
    if (!user) {
      throw new BadRequestException('用户不存在')
    }

    if (user.password !== loginUserDto.password) {
      throw new BadRequestException('密码错误')
    }

    return '登录成功'
  }
}
