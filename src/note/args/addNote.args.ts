import { InputType, ArgsType, Field } from "type-graphql";

@InputType()
class AddNoteRecord {
  @Field()
  name: string;
  @Field()
  text: string;
}

@ArgsType()
export class AddNoteArgs {
  @Field()
  record: AddNoteRecord;
}
