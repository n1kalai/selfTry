import { InputType, ID, ArgsType, Field } from "type-graphql";

@InputType()
class FindKeywordByIdRecord {
  @Field((type) => ID)
  id: string;
}
@ArgsType()
export class FindKeywordByIdArgs {
  @Field()
  record: FindKeywordByIdRecord;
}
