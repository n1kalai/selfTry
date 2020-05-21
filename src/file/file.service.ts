import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { File } from "./file.entity";
import { Repository, DeleteResult } from "typeorm";
import { AddFileArgs } from "./args/addFile.args";
import { Args } from "@nestjs/graphql";
import { Folder } from "../folder/folder.entity";

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(File)
    private readonly fileRepository: Repository<File>,
    @InjectRepository(Folder)
    private readonly folderRepository: Repository<Folder>
  ) {}

  async getAllFiles(): Promise<File[]> {
    return await this.fileRepository.find({
      relations: ["folder", "notes"],
    });
  }

  async removeFile(id): Promise<any> {
    const returnedId = id;
    const result = await this.fileRepository.delete(id);
    if (!result) {
      throw new NotFoundException(`File with ${id} doesnot exist`);
    }

    if (result.affected === 0) {
      return null;
    }
    console.log("returned", returnedId);
    return { id: returnedId };
  }

  async addFile(addFileArgs: AddFileArgs): Promise<File> {
    const { name, order, iconUrl } = addFileArgs.record;
    const newFile = new File();
    newFile.name = name;
    newFile.order = +order;
    newFile.iconUrl = iconUrl;
    return await this.fileRepository.save(newFile);
  }

  async stickFileToFolder(folderId: string, fileId: string): Promise<Folder> {
    try {
      const foundFolder = await this.folderRepository.findOne({
        where: { uid: folderId },
        relations: ["files", "files.folder"],
      });
      console.log("folder", foundFolder);
      const foundFile = await this.fileRepository.findOne({
        where: { id: fileId },
      });
      console.log("file", foundFile);
      foundFolder.files.push(foundFile);
      return await this.folderRepository.save(foundFolder);
    } catch (err) {
      console.log("fromFileService", err);
    }

    return null;
  }

  async findFileById(id: string): Promise<File> {
    const file = await this.fileRepository.findOne(id, {
      relations: ["notes", "notes.keywords", "folder"],
    });
    return file;
  }

  async uploadFile(file) {
    await console.log("service", file);
    return null;
  }
}
