import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import { join } from 'path'
import { NestExpressApplication } from '@nestjs/platform-express'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  // 添加参数校验的pipe
  app.useGlobalPipes(new ValidationPipe({ transform: true }))

  app.enableCors()

  // 静态资源托管：将 src/files/img 目录下的文件通过 /img 前缀对外暴露
  // 这样上传的图片可以通过 http://localhost:3000/img/文件名 直接访问
  // 例如：src/files/img/1688888888888-123456789.png 可通过 http://localhost:3000/img/1688888888888-123456789.png 访问
  app.useStaticAssets(join(__dirname, '../src/files/img'), { prefix: '/img' })

  await app.listen(process.env.PORT ?? 3000)
}

bootstrap()
