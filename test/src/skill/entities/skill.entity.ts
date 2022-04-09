import { CvEntity } from "src/cv/entities/cv.entity";
import { TimestampEntities } from "src/Generics/timestamp.entities";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";




@Entity('skill')
export class SkillEntity extends TimestampEntities {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    designation:string

    @ManyToMany(()=>CvEntity)
    @JoinTable()
    cvs: CvEntity[]

    
}

