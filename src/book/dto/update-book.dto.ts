import { PartialType } from '@nestjs/mapped-types'
import { AddBookDto } from './add-book.dto'
import { IsNotEmpty } from 'class-validator'

export class UpdateBookDto extends PartialType(AddBookDto) {
  @IsNotEmpty({ message: '书名不能为空' })
  name: string

  @IsNotEmpty({ message: '作者不能为空' })
  author: string

  @IsNotEmpty({ message: '描述不能为空' })
  description: string

  cover: string
}
