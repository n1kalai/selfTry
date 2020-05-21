import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  BaseEntity,
} from "typeorm";
import { Field, ObjectType, ID } from "type-graphql";
import { Folder } from "../folder/folder.entity";
import { Note } from "./../note/note.entity";

@Entity()
@ObjectType()
export class File extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  @Field((type) => ID, { nullable: true })
  id: string;

  @Column()
  @Field({ nullable: true })
  name: string;

  @Column()
  @Field({ nullable: true })
  iconUrl: string;

  @Column()
  @Field({ nullable: true })
  order: number;

  @ManyToOne((type) => Folder)
  @JoinColumn({ name: "file_folder" })
  @Field((type) => Folder, { nullable: true })
  folder: Folder;

  @ManyToMany((type) => Note, (note) => note.files)
  @Field((type) => [Note], { nullable: true })
  notes: Note[];
}
