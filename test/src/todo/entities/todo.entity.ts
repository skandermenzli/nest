import { TimestampEntities } from 'src/Generics/timestamp.entities';
import { Column, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { TodoStatusEnum } from '../enums/todo-status.enum';

@Entity()
export class Todo extends TimestampEntities {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  description: string;
  
  @Column({
    type: 'enum',
    enum: TodoStatusEnum,
    default: TodoStatusEnum.waiting,
  })
  status: TodoStatusEnum = TodoStatusEnum.waiting;
  
}
