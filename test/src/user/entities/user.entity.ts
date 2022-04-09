import { Exclude } from "class-transformer";
import { CvEntity } from "src/cv/entities/cv.entity";
import { TimestampEntities } from "src/Generics/timestamp.entities";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";



@Entity('user')
export class UserEntity extends TimestampEntities{

  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 50,
    unique: true
  })
  username: string;

  @Column({
    unique: true
  })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  @Exclude()
  salt: string;

  

  @OneToMany(
    type => CvEntity,
    (cv) => cv.user,
    {
      nullable: true,
      cascade: true
    }
  )
  cvs: CvEntity[];
}