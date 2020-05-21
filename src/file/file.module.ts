import { Module } from "@nestjs/common";
import { FileService } from "./file.service";
import { FileResolver } from "./file.resolver";
import { File } from "./file.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Folder } from "../folder/folder.entity";
import { FolderService } from "../folder/folder.service";

@Module({
  imports: [TypeOrmModule.forFeature([File, Folder])],
  providers: [FileService, FileResolver, FolderService],
  exports: [FileService],
})
export class FileModule {}
