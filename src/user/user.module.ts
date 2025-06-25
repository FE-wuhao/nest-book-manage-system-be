import { Module } from '@nestjs/common'
import { UserService } from './user.service'
import { UserController } from './user.controller'
import { DbModule } from 'src/db/db.module'

@Module({
  imports: [
    DbModule.register({
      path: 'src/files/json/users.json'
    })
  ],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
