import { InputType, ID, ArgsType, Field } from "type-graphql";

@InputType()
class FindFolderByIdRecord {
  @Field((type) => ID)
  id: string;
}
@ArgsType()
export class FindFolderByIdArgs {
  @Field()
  record: FindFolderByIdRecord;
}
