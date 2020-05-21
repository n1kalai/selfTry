import { InputType, Field, ArgsType, ID } from "type-graphql";

@InputType()
class GetFolderEditRecord {
  @Field((type) => ID)
  id: string;
  @Field()
  name: string;
}
@ArgsType()
export class GetFolderEditArgs {
  record: GetFolderEditRecord;
}
