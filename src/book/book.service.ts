import { Injectable } from '@nestjs/common'
import { AddBookDto } from './dto/add-book.dto'
import { UpdateBookDto } from './dto/update-book.dto'
import { DbService } from 'src/db/db.service'
import { Book } from './entities/book.entity'
import { generateRandomString } from 'src/utils'

@Injectable()
export class BookService {
  constructor(private readonly dbService: DbService) {}

  async add(createBookDto: AddBookDto) {
    const books = await this.dbService.read()
    const newBook = new Book()

    newBook.id = generateRandomString()
    newBook.name = createBookDto.name
    newBook.author = createBookDto.author
    newBook.description = createBookDto.description
    newBook.cover = createBookDto.cover

    books.push(newBook)
    await this.dbService.write(books)

    return newBook
  }

  async delete(id: string) {
    const books = await this.dbService.read()
    const index = books.findIndex(book => book.id === id)
    books.splice(index, 1)
    await this.dbService.write(books)
  }

  async update(id: string, updateBookDto: UpdateBookDto) {
    const books = await this.dbService.read()
    const index = books.findIndex(book => book.id === id)
    books[index] = {
      ...books[index],
      ...updateBookDto
    }
    await this.dbService.write(books)

    return books[index]
  }

  async list() {
    return await this.dbService.read()
  }

  async read(id: string) {
    const books = await this.dbService.read()
    return books.find(book => book.id === id)
  }
}
