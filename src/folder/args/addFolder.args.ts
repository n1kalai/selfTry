import { InputType, Field, ArgsType } from "type-graphql";

@InputType()
class AddFolderRecord {
  @Field()
  name: string;
}
@ArgsType()
export class AddFolderArgs {
  @Field()
  record: AddFolderRecord;
}
