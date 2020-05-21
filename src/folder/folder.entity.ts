import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  OneToMany,
  JoinTable,
} from "typeorm";
import { ObjectType, Field } from "type-graphql";
import { ID } from "type-graphql";
import { User } from "./../user/entities/user.entity";
import { File } from "../file/file.entity";

@Entity()
@ObjectType()
export class Folder {
  @PrimaryGeneratedColumn("uuid")
  @Field((type) => ID, { nullable: true })
  uid: string;

  @Column()
  @Field({ nullable: true })
  name: string;

  @OneToOne((type) => User, (user) => user.folder, { nullable: true })
  @Field((type) => User, { nullable: true })
  user: User;

  @OneToMany((type) => File, (file) => file.folder, { nullable: true })
  @Field((type) => [File], { nullable: true })
  files: File[];
}
