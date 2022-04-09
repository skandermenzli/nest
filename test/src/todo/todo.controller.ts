import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
  Req,
  Res,
  Version,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { version } from 'os';
import { AddTodoDto } from './dto/add_todo.dto';
import { Todo } from './entities/todo.entity';
import { TodoStatusEnum } from './enums/todo-status.enum';
import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Get('')
  getTodos() {
    console.log('recuperer la liste des todos');
    return this.todoService.getTodos();
  }
  // @Get('v2')
  // getTodosv2(@Req() request: Request, @Res() response: Response) {
  //   console.log('recuperer la liste des todos');
  //   response.status(205);
  //   response.json({
  //     contenu: 'content in res object',
  //   });
  // }

  @Get('/:id')
  getTodobyid(@Param('id', ParseIntPipe) id) {
    console.log('get todo by id');
    return this.todoService.getTodobyId(id);
  }

  @Post()
  addTodos(@Body() newtodo: AddTodoDto): Todo {
    //console.log(newtodo.name);
    console.log('ajouter un Todo a la liste des todos');
    console.log(newtodo);
    return this.todoService.addTodos(newtodo);
  }

  //supprimer un todo vua son id
  @Delete('/:id')
  deleteTodos(@Param('id', ParseIntPipe) id) {
    console.log('supprimer un todo de la liste des todos');
    return this.todoService.deleteTodo(id);
  }

  @Put(':id')
  updateTodos(@Param('id', ParseIntPipe) id, @Body() newtodo: Partial<Todo>) {
    return this.todoService.updateTodo(id, newtodo);
  }

//requests to the database ***V2***

  @Get('')
  @Version('2')
  async getTodosV2():Promise<Todo[]>{
    return await this.todoService.getTodosV2()

  }
  @Post('')
  @Version('2')
  async addTodosV2(@Body() newtodo: AddTodoDto):Promise<Todo>{
    return await this.todoService.addTodosV2(newtodo)

  }

  @Patch(':id')
  @Version('2')
  async updateTodosV2(@Body() newtodo: AddTodoDto,@Param('id',ParseIntPipe) id:number):Promise<Todo>{
    return await this.todoService.updateTodoV2(newtodo,id)
  }

  @Delete(':id')
  @Version('2')
  async deleteTodosV2(@Param('id',ParseIntPipe) id:number){
    return await this.todoService.softdelete(id)
  }
  

  @Get(':id')
  @Version('2')
  async restoreTodosV2(@Param('id',ParseIntPipe) id:number){
    return await this.todoService.restoretodo(id);
  }

  @Get(':chaine/:statu')
  @Version('3')
  async getTodosV3(@Param('chaine') chaine:string,@Param('statu') statu:string){
    return await this.todoService.gettodosV3(chaine,statu);
  }


  @Get('paginated')
  @Version('3')
  async getTodospaginatedV3(@Query('num',ParseIntPipe) num:number,@Query('start_index',ParseIntPipe) start_index:number){
    return await this.todoService.getpaginated(num,start_index);
  }


  @Get('')
  @Version('3')
  async getTodosbyStatus(@Query('deb')deb:Date,@Query('fin')fin:Date){
    return await this.todoService.grpbystatus();
  }

}
