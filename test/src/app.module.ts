import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { FirstMiddleware } from './middlewares/first.middleware';
import { TodoModule } from './todo/todo.module';
import { UserModule } from './user/user.module';
import { CvModule } from './cv/cv.module';
import { SkillModule } from './skill/skill.module';

import *as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    TodoModule,
    ConfigModule.forRoot({
      isGlobal:true
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3307,
      username: 'root',
      password: '',
      database: 'nest-todo',
      entities: ["dist/**/*.entity{.ts,.js}"],
      synchronize: true,
    }),
    UserModule,
    CvModule,
    SkillModule
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(FirstMiddleware).forRoutes('todo');
  }
}
