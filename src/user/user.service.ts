import { Injectable, OnModuleInit } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, getRepository } from "typeorm";
import { User } from "./entities/user.entity";
import { RegisterUserArgs } from "./dto/user-registration.dto";
import { ResolveProperty, Args } from "@nestjs/graphql";
import { Folder } from "./../folder/folder.entity";
import { FolderService } from "./../folder/folder.service";

@Injectable()
export class UserService implements OnModuleInit {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly folderService: FolderService
  ) {}

  async onModuleInit(): Promise<void> {
    if ((await this.userRepository.count()) >= 5) {
      return;
    }
    const array = [];
    for (let i = 0; i < 5; i++) {
      const userToBeSeeded = new User();
      userToBeSeeded.firstName = "Name " + (i + 1);
      userToBeSeeded.lastName = "Lastname " + (i + 1);
      array.push(userToBeSeeded);
    }
    await this.userRepository.save(array);
  }

  async userRegister(registerUserArgs: RegisterUserArgs): Promise<User> {
    const { lastName, firstName } = registerUserArgs.record;
    const user = new User();
    user.lastName = lastName;
    user.firstName = firstName;
    return await this.userRepository.save(user);
  }

  async getUsers(): Promise<User[]> {
    return await this.userRepository.find({
      relations: [
        "folder",
        "folder.files",
        "folder.files.folder",
        "folder.files.folder.user",
        "folder.files.notes",
        "folder.files.notes.keywords",
      ],
    });
  }

  async getUserByName(name: string): Promise<User> {
    return await this.userRepository.findOne({
      firstName: name,
    });
  }

  async queryBuilderUsers(): Promise<User> {
    return await getRepository(User)
      .createQueryBuilder("user")
      .where("first_name = :name", { name: "Nino" })
      .getOne();
  }

  async editUser(): Promise<User> {
    return await getRepository(User)
      .createQueryBuilder("user")
      .where("first_name = :name", { name: "Tamar" })
      .getOne();
  }

  async addFolderToUser(registerUserArgs: RegisterUserArgs): Promise<User> {
    const newUser = new User();
    const { firstName, lastName, folderName } = registerUserArgs.record;
    const savedFolder = await this.folderService.addFolder(folderName);
    console.log(savedFolder);
    newUser.firstName = firstName;
    newUser.lastName = lastName;
    newUser.folder = savedFolder;
    return await this.userRepository.save(newUser);
  }
}
