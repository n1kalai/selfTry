import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveProperty,
  Root,
} from "@nestjs/graphql";
import { User } from "./entities/user.entity";
import { UserService } from "./user.service";
import { RegisterUserArgs } from "./dto/user-registration.dto";
import { GetUserByNameArgs } from "./dto/findUserByName.args";
import { JoinColumn, OneToOne } from "typeorm";
import { Folder } from "./../folder/folder.entity";

@Resolver((of) => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @ResolveProperty((returns) => String, { nullable: true })
  async offeredUsername(@Root() user: User): Promise<string> {
    return user.firstName + "_1987";
  }

  @Mutation((returns) => User)
  async userRegister(
    @Args() registerUserArgs: RegisterUserArgs
  ): Promise<User> {
    return await this.userService.userRegister(registerUserArgs);
  }

  @Query((returns) => [User])
  async getUsers(): Promise<User[]> {
    return await this.userService.getUsers();
  }

  @Query((returns) => User, { nullable: true })
  async getUserByName(
    @Args() getUserByNameArgs: GetUserByNameArgs
  ): Promise<User> {
    return await this.userService.getUserByName(getUserByNameArgs.record.name);
  }

  @Query((returns) => User, { nullable: true })
  async queryBuilderUsers(): Promise<User> {
    return await this.userService.queryBuilderUsers();
  }

  @Mutation((returns) => User)
  async addFolderToUser(
    @Args() registerUserArgs: RegisterUserArgs
  ): Promise<User> {
    return await this.userService.addFolderToUser(registerUserArgs);
  }
}
