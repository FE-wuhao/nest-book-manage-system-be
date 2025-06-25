import { Inject, Injectable } from '@nestjs/common'
import { IDbModuleOptions } from './db.module'
import { access, readFile, writeFile } from 'fs/promises'

@Injectable()
export class DbService {
  constructor(@Inject('OPTIONS') private options: IDbModuleOptions) {}

  async read() {
    const filePath = this.options.path

    try {
      await access(filePath)
    } catch (error) {
      console.error(error)
      return []
    }

    const data = await readFile(filePath, 'utf-8')

    if (!data) {
      return []
    }

    return JSON.parse(data)
  }

  async write(data: Record<string, any> = {}) {
    const filePath = this.options.path

    try {
      await writeFile(filePath, JSON.stringify(data))
    } catch (error) {
      console.error(error)
    }
  }
}
