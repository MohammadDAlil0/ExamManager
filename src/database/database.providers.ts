
import { Sequelize } from 'sequelize-typescript';
import { ConfigService } from '@nestjs/config';
import { Inject } from '@nestjs/common';


export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    Inject: ConfigService,
    useFactory: async (configService: ConfigService) => {
      const sequelize = new Sequelize({
        dialect: configService.getOrThrow('DATA_BASE_DIALECT'),
        host: configService.getOrThrow('DATA_BASE_HOST'),
        port: configService.getOrThrow('DATA_BASE_PORT'),
        username: configService.getOrThrow('DATA_BASE_USERNAME'),
        password: configService.getOrThrow('DATA_BASE_PASSWORD'),
        database: configService.getOrThrow('DATA_BASE_NAME'),
      });
      sequelize.addModels([]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
