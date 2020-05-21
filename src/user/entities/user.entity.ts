import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { Folder } from "./../../folder/folder.entity";

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn("uuid") // for postgre
  @Field((type) => ID) // for graphql
  uid: string; // for typescript

  @Column({ name: "first_name", nullable: true })
  @Field({ nullable: true })
  firstName: string;

  @Column({ name: "last_name", nullable: true })
  @Field({ nullable: true })
  lastName: string;

  @OneToOne((type) => Folder, { nullable: true })
  @JoinColumn({ name: "user_folder" })
  @Field((type) => Folder, { nullable: true })
  folder: Folder;
}
