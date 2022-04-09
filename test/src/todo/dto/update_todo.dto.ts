import { IsNotEmpty, IsOptional } from "class-validator";
import { TodoStatusEnum } from "../enums/todo-status.enum";

export class updateTodoDto {
  @IsOptional()
  name: string;
  @IsOptional()  
  description: string;
  
  status: TodoStatusEnum;
}
