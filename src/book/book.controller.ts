import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
  Query
} from '@nestjs/common'
import { BookService } from './book.service'
import { AddBookDto } from './dto/add-book.dto'
import { UpdateBookDto } from './dto/update-book.dto'
import { FileInterceptor } from '@nestjs/platform-express'
import storage from './my-file-storage'

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  add(@Body() createBookDto: AddBookDto) {
    return this.bookService.add(createBookDto)
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.bookService.delete(id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.bookService.update(id, updateBookDto)
  }

  @Get()
  list(@Query('name') name: string) {
    return this.bookService.list(name)
  }

  @Get(':id')
  read(@Param('id') id: string) {
    return this.bookService.read(id)
  }
  @Post('upload_cover')
  /**
   * 封面图片上传接口
   * 说明：
   * 1. 使用 FileInterceptor 拦截器处理文件上传，底层已自动完成 multipart/form-data 解析、文件保存、类型/大小校验等大部分上传逻辑
   * 2. 'file' 是前端表单上传的字段名
   * 3. dest 指定文件保存目录，未自定义 storage 时，文件名为随机字符串
   * 4. storage 可自定义文件名、路径等，若不自定义则用默认 diskStorage
   * 5. limits 用于限制文件大小，这里最大 5MB
   * 6. fileFilter 用于限制只允许上传图片类型文件，非图片会抛出异常
   * 7. 控制器方法只需处理业务相关逻辑（如返回路径、保存数据库等），绝大部分上传底层逻辑已由 FileInterceptor 完成
   */
  @UseInterceptors(
    FileInterceptor('file', {
      // 指定文件保存目录，未自定义 storage 时，文件名为随机字符串
      dest: 'src/files/img',
      // storage: storage,
      // storage 变量为自定义存储配置（如自定义文件名、路径等），如无特殊需求可不自定义
      storage: storage,
      // 限制文件最大 5MB
      limits: {
        fileSize: 1024 * 1024 * 5
      },
      // 只允许上传图片类型文件，非图片会抛出异常
      fileFilter: (_, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
          cb(null, true)
        } else {
          cb(new BadRequestException('只允许上传图片'), false)
        }
      }
    })
  )
  uploadCover(
    // @UploadedFile 装饰器会自动把上传后的文件对象注入到参数 file
    // Express.Multer.File 类型包含文件名、路径、大小等信息
    @UploadedFile() file: Express.Multer.File
  ) {
    // 这里只需处理业务逻辑，比如返回文件路径或保存到数据库
    return `img/${file.filename}`
  }
}
