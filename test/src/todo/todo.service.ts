import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddTodoDto } from './dto/add_todo.dto';
import { updateTodoDto } from './dto/update_todo.dto';
import { Todo } from './entities/todo.entity';
import { TodoStatusEnum } from './enums/todo-status.enum';

@Injectable()
export class TodoService {
  private todos: Todo[] = [];
  constructor(
    @InjectRepository(Todo)
    private todoRepository:Repository<Todo>
  ){}
  getTodos(): Todo[] {
    return this.todos;
  }

  addTodos(newtodo: AddTodoDto): Todo {
    const { name, description } = newtodo;
    let id;
    let updatedAt;
    let deletedAt;
    if (this.todos.length) {
      id = this.todos[this.todos.length - 1].id + 1;
    } else {
      id = 1;
    }
    const todo = {
      id,
      name,
      description,
      createdAt: new Date().toLocaleDateString(),
      status: TodoStatusEnum.waiting,
      updatedAt,
      deletedAt
    };
    this.todos.push(todo);
    return todo;
  }

  getTodobyId(id: number): Todo {
    const todo = this.todos.find((actualtodo) => actualtodo.id === id);
    if (todo) return todo;
    else throw new NotFoundException(`le todo d'id ${id} n'existe pas`);
  }

  deleteTodo(id: number) {
    const index = this.todos.findIndex((todo) => todo.id === +id);
    if (index >= 0) {
      this.todos.splice(index, 1);
    } else {
      throw new NotFoundException(`le todo d'id ${id} n'existe pas`);
    }
    return {
      msg: `le todo d'id ${id} a été supprimé `,
      count: 1,
    };
  }

  updateTodo(id: number, newtodo: Partial<Todo>) {
    const todo = this.getTodobyId(id);
    todo.description = newtodo.description
      ? newtodo.description
      : todo.description;
    todo.name = newtodo.name ? newtodo.name : todo.name;
    todo.status = newtodo.status ? newtodo.status : todo.status;
    console.log('modifier un todo de la liste des todos');
    return todo;
  }

  async getTodosV2():Promise<Todo[]>{
    
    return await this.todoRepository.find();

  }
  async addTodosV2(todo:AddTodoDto):Promise<Todo>{
    return await this.todoRepository.save(todo)
  }

  async findbyidV2(id:number){
    const todo = await this.todoRepository.findOne(id);
    if(! todo){
      throw new NotFoundException(`le cv d'id: ${id} n'existe pas`)
    }
    return todo
  }

  async updateTodoV2(todo:updateTodoDto,id:number):Promise<Todo>{
    const newtodo = await this.todoRepository.preload({
      id,
      ...todo
    })
    if(! newtodo){
      throw new NotFoundException(`le cv d'id: ${id} n'existe pas`)
    }
    return await this.todoRepository.save(newtodo)
  }

  async deleteTodoV2(id:number){
    //const todo = await this.findbyidV2(id)
   // return await this.todoRepository.remove(todo);

    return await this.todoRepository.delete(id);
    
  }

  async softdelete(id:number) {
     const result = await this.todoRepository.softDelete(id);
     if (result.affected){
       return result
     }
     else{
      throw new NotFoundException(`le cv d'id: ${id} n'existe pas`)
     }
    
  }

  async restoretodo(id:number){
    return await this.todoRepository.restore(id);

  }


  async gettodosV3(chaine:string,statu:string){
    const qb = this.todoRepository.createQueryBuilder("todo")
    qb.select("*")
    .where("todo.name like :chaine or todo.description like :chaine and todo.status = :statu")
    .setParameters({chaine:'%'+chaine+'%',statu:'%'+statu+'%'})
    console.log(qb.getSql());
    return qb.getRawMany()
    
  }


  async getpaginated(num:number,start_index:number){
    const qb = this.todoRepository.createQueryBuilder("todo")
    qb.select("*")
    .take(num)
    .skip(start_index)
    console.log(qb.getSql());
    return qb.getRawMany()
  }


  async grpbystatus(deb:string="2022-04-05 16:50:36.000000",fin:string="2022-04-05 16:50:36.000000"
    ){
    const qb = this.todoRepository.createQueryBuilder("todo")
    qb.select("todo.status,count(todo.id) as nbrDeTodos ")
    .where("todo.createdAt>:deb and todo.createdAt<:fin")
    .setParameters({deb:deb,fin:fin})
    .groupBy("todo.status")
    console.log(qb.getSql());
    return qb.getRawMany()
  }

}
