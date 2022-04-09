import { Column, CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from "typeorm";

export class TimestampEntities {
    @CreateDateColumn({
        update:false
      })
  createdAt: string;
  @UpdateDateColumn()
  updatedAt:Date;
  @DeleteDateColumn()
  deletedAt:Date;
}