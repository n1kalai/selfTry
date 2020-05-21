import { InputType, ID, ArgsType, Field } from "type-graphql";

@InputType()
class FindNoteByIdRecord {
  @Field((type) => ID)
  id: string;
}
@ArgsType()
export class FindNoteByIdArgs {
  @Field()
  record: FindNoteByIdRecord;
}
