import { InputType, ArgsType, Field } from "type-graphql";

@InputType()
class RemoveFileRecord {
  @Field()
  id: string;
}
@ArgsType()
export class RemoveFileArgs {
  @Field()
  record: RemoveFileRecord;
}
