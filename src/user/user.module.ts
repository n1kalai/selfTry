import { TypeOrmModule } from "@nestjs/typeorm";
import { Module, forwardRef } from "@nestjs/common";

import { User } from "./entities/user.entity";
import { UserService } from "./user.service";
import { UserResolver } from "./user.resolver";
import { Folder } from "./../folder/folder.entity";
import { FolderService } from "./../folder/folder.service";

@Module({
  imports: [TypeOrmModule.forFeature([User, Folder])],
  providers: [UserService, UserResolver, FolderService],
  exports: [UserService],
})
export class UserModule {}
