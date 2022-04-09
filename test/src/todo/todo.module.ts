import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';

@Global()
@Module({
  imports:[TypeOrmModule.forFeature([Todo])],
  controllers: [TodoController],
  providers: [TodoService]
})
export class TodoModule {}
