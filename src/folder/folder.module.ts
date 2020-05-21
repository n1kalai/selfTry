import { Module } from "@nestjs/common";
import { FolderService } from "./folder.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Folder } from "./folder.entity";
import { FolderResolver } from "./folder.resolver";
import { User } from "./../user/entities/user.entity";
import { FileService } from "./../file/file.service";
import { File } from "../file/file.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Folder, User, File])],
  providers: [FolderService, FolderResolver, FileService],
  exports: [FolderService],
})
export class FolderModule {}
