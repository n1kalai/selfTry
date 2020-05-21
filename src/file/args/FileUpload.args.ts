import { InputType, Field, ArgsType } from "type-graphql";

@InputType()
class FileUploadRecord {
  @Field()
  files: [string];
}

@ArgsType()
export class FileUploadArgs {
  @Field()
  file: FileUploadRecord;
}
