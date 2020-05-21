import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { File } from "./../file/file.entity";
import { Keyword } from "./../keyword/keyword.entity";

@Entity()
@ObjectType()
export class Note {
  @PrimaryGeneratedColumn("uuid")
  @Field({ nullable: true })
  id: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  name: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  text: string;

  @ManyToMany((type) => File, (file) => file.notes, { nullable: true })
  @JoinTable({ name: "notes_file" })
  @Field((type) => [File], { nullable: true })
  files: File[];

  @ManyToMany((type) => Keyword, (keyword) => keyword.notes, { nullable: true })
  @Field((type) => [Keyword], { nullable: true })
  keywords: Keyword[];
}
