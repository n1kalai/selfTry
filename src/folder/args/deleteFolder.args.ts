import { InputType, ArgsType, Field } from "type-graphql";

@InputType()
class RemoveFolderRecord {
  @Field()
  uid: string;
}
@ArgsType()
export class RemoveFolderArgs {
  @Field()
  record: RemoveFolderRecord;
}
