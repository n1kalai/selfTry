import { InputType, ArgsType, Field } from "type-graphql";

@InputType()
class GetFolderByNameRecord {
  @Field()
  name: string;
}

@ArgsType()
export class GetFolderByNameArgs {
  @Field()
  record: GetFolderByNameRecord;
}
