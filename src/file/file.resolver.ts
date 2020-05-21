import { Resolver, Args, Mutation, Query } from "@nestjs/graphql";
import {
  UseInterceptors,
  UploadedFile,
  Bind,
  UploadedFiles,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { File } from "./file.entity";
import { FileService } from "./file.service";
import { AddFileArgs } from "./args/addFile.args";
import { Folder } from "./../folder/folder.entity";
import { StickFileToFolderArgs } from "./args/stickFileToFolder.args";
import { FindFileByIdArgs } from "./args/findFileById.args";
import { RemoveFileArgs } from "./args/removeFile.args";
// import { UploadFileIdArgs } from "./args/uploadFile.args";
import { FileUploadArgs } from "./args/FileUpload.args";

@Resolver((of) => File)
export class FileResolver {
  constructor(private readonly fileService: FileService) {}

  @Mutation((returns) => File)
  async addFile(@Args() addFileArgs: AddFileArgs): Promise<File> {
    return this.fileService.addFile(addFileArgs);
  }

  @Mutation((returns) => File, { nullable: true })
  async removeFile(@Args() id: RemoveFileArgs): Promise<void> {
    return await this.fileService.removeFile(id.record.id);
  }

  @Query((returns) => [File], { nullable: true })
  async getAllFiles(): Promise<File[]> {
    return await this.fileService.getAllFiles();
  }

  @Mutation((returns) => Folder, { nullable: true })
  async stickFileToFolder(
    @Args() stickFileToFolderArgs: StickFileToFolderArgs
  ): Promise<Folder> {
    try {
      return await this.fileService.stickFileToFolder(
        stickFileToFolderArgs.record.folderId,
        stickFileToFolderArgs.record.fileId
      );
    } catch (err) {
      console.log("fromResolver", err);
    }
  }

  @Query((returns) => File)
  async findFileById(@Args() id: FindFileByIdArgs): Promise<File> {
    return await this.fileService.findFileById(id.record.id);
  }
  // file upload
  // @Mutation((returns) => File)
  // @UseInterceptors(FileInterceptor("file"))
  // @Bind(UploadedFile())
  // async uploadFile(@Args() file: FileUploadArgs, @UploadedFiles() files) {
  //   console.log(file);
  //   console.log(files);
  //   return await this.fileService.uploadFile(file.file);
  // }
}
