import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Folder } from "./folder.entity";
import { Repository, createQueryBuilder, getRepository } from "typeorm";
import { GetFolderByNameArgs } from "./dto/findFolderByName.dto";

@Injectable()
export class FolderService {
  constructor(
    @InjectRepository(Folder)
    private readonly folderRepository: Repository<Folder>
  ) {}

  async addFolder(name: string): Promise<Folder> {
    const newFold = new Folder();
    newFold.name = name;
    return await this.folderRepository.save(newFold);
  }

  async getAllFolders(): Promise<Folder[]> {
    return await this.folderRepository.find({
      relations: ["files", "user", "files.notes", "files.notes.keywords"],
    });
  }

  async getFolderByName(name: GetFolderByNameArgs): Promise<Folder> {
    return await this.folderRepository.findOne({ name: name.record.name });
  }

  downCase = {
    gela: "sadasda",
  };

  async searchFolder(name: string): Promise<Folder[]> {
    return await getRepository(Folder)
      .createQueryBuilder()
      .where(`name LIKE :name`, {
        name: `%${name.toLowerCase()}%`,
      })
      .getMany();
  }

  async getFolderById(id: string): Promise<Folder> {
    return await this.folderRepository.findOne(id, {
      relations: ["files", "files.notes", "files.notes.keywords"],
    });
  }

  async editFolder(record: { id: string; name: string }): Promise<Folder> {
    const foundFolder = await this.folderRepository.findOne(record.id);
    if (!foundFolder) {
      throw new NotFoundException(`Folder With ${record.name} Doesnot exist`);
    }
    const updatedFolder = {
      ...foundFolder,
      ...record,
    };
    return await this.folderRepository.save(updatedFolder);
  }

  async deleteFolder(uid: string): Promise<any> {
    const folderId = uid;
    const result = await this.folderRepository.delete(uid);
    console.log(result);
    return { uid: folderId };
    // console.log(folderId);
    // return { uid: folderId };
  }
}
