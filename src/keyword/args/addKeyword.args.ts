import { InputType, ArgsType, Field } from "type-graphql";

@InputType()
class AddKeywordRecord {
  @Field()
  name: string;
  @Field()
  text: string;
}

@ArgsType()
export class AddKeywordArgs {
  @Field()
  record: AddKeywordRecord;
}
