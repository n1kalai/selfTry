import { InputType, ArgsType, Field } from "type-graphql";

@InputType()
class AddFileRecord {
  @Field()
  name: string;

  @Field()
  iconUrl: string;

  @Field()
  order: number;
}
@ArgsType()
export class AddFileArgs {
  @Field()
  record: AddFileRecord;
}
