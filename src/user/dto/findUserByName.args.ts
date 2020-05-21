import { Field, ArgsType, InputType } from "type-graphql";

@InputType()
class GetUserByNameRecord {
  @Field()
  name: string;
}

@ArgsType()
export class GetUserByNameArgs {
  @Field()
  record: GetUserByNameRecord;
}
