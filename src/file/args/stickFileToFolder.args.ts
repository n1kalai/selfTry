import { InputType, Field, ArgsType } from "type-graphql";

@InputType()
class StickFileToFolderRecord {
  @Field()
  folderId: string;
  @Field()
  fileId: string;
}

@ArgsType()
export class StickFileToFolderArgs {
  @Field()
  record: StickFileToFolderRecord;
}
