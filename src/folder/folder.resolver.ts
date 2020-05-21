import { Resolver, Mutation, Args, Query } from "@nestjs/graphql";
import { Folder } from "./folder.entity";
import { FolderService } from "./folder.service";
import { AddFolderArgs } from "./args/addFolder.args";
import { GetFolderByNameArgs } from "./dto/findFolderByName.dto";
import { GetFolderEditArgs } from "./args/editFolder.args";
import { FindFolderByIdArgs } from "./args/findFolderById.args";
import { RemoveFolderArgs } from "./args/deleteFolder.args";

@Resolver((of) => Folder)
export class FolderResolver {
  constructor(private folderService: FolderService) {}
  @Mutation((returns) => Folder)
  async addFolder(@Args() addFolderArgs: AddFolderArgs): Promise<Folder> {
    return this.folderService.addFolder(addFolderArgs.record.name);
  }

  @Query((returns) => [Folder], { nullable: true })
  async getAllFolders(): Promise<Folder[]> {
    return await this.folderService.getAllFolders();
  }

  @Query((returns) => Folder)
  async getFolderByName(
    @Args() folderName: GetFolderByNameArgs
  ): Promise<Folder> {
    return await this.folderService.getFolderByName(folderName);
  }

  @Query((returns) => [Folder], { nullable: true })
  async searchFolders(@Args() name: GetFolderByNameArgs): Promise<Folder[]> {
    return await this.folderService.searchFolder(name.record.name);
  }

  @Mutation((returns) => Folder)
  async editFolderById(getFolderEditArgs: GetFolderEditArgs): Promise<Folder> {
    return this.folderService.editFolder(getFolderEditArgs.record);
  }

  @Query((returns) => Folder)
  async getFolderById(
    @Args() findFolderByIdArgs: FindFolderByIdArgs
  ): Promise<Folder> {
    return await this.folderService.getFolderById(findFolderByIdArgs.record.id);
  }

  @Mutation((returns) => Folder, { nullable: true })
  async deleteFolder(@Args() uid: RemoveFolderArgs): Promise<void> {
    return await this.folderService.deleteFolder(uid.record.uid);
  }
}
