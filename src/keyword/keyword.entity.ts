import {
  PrimaryGeneratedColumn,
  Entity,
  Column,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Field, ID, ObjectType } from "type-graphql";
import { type } from "os";
import { Note } from "./../note/note.entity";

@Entity()
@ObjectType()
export class Keyword {
  @PrimaryGeneratedColumn("uuid")
  @Field((type) => ID, { nullable: true })
  id: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  name: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  text: string;

  @ManyToMany((type) => Note, (note) => note.keywords, { nullable: true })
  @JoinTable({ name: "note_keyword" })
  @Field((type) => [Note], { nullable: true })
  notes: Note[];
}
