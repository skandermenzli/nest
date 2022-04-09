import { CvEntity } from "src/cv/entities/cv.entity";
import { TimestampEntities } from "src/Generics/timestamp.entities";
import { Column, ManyToMany, PrimaryGeneratedColumn } from "typeorm";



export class SkillEntity extends TimestampEntities {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    designation:string

    @ManyToMany(
        type => CvEntity,
        (cv) => cv.skills,
        {
          nullable: true,
          cascade: true
        }
      )
      cvs: CvEntity[];
}
