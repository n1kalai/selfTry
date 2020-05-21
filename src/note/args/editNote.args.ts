import { Field, ArgsType, InputType, ID } from "type-graphql";

@InputType()
class EditNoteRecord {
  @Field((type) => ID)
  id: string;

  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  text: string;
}

@ArgsType()
export class EditNoteArgs {
  @Field()
  record: EditNoteRecord;
}
