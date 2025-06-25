import { DynamicModule, Module } from '@nestjs/common'
import { DbService } from './db.service'

export interface IDbModuleOptions {
  path: string
}

@Module({})
export class DbModule {
  static register(options: IDbModuleOptions): DynamicModule {
    return {
      module: DbModule,
      providers: [
        {
          provide: 'OPTIONS',
          useValue: options
        },
        DbService
      ],
      exports: [DbService]
    }
  }
}
