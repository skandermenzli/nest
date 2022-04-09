
import { IsNotEmpty } from "class-validator";
import { TodoStatusEnum } from "../enums/todo-status.enum";

export class AddTodoDto {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()  
  description: string;
    
  status: TodoStatusEnum;
}
