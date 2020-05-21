import { InputType, ArgsType, Field, ID } from "type-graphql";

@InputType()
class FindFileByIdRecord {
  @Field({ nullable: true })
  id: string;
}

@ArgsType()
export class FindFileByIdArgs {
  @Field({ nullable: true })
  record: FindFileByIdRecord;
}
