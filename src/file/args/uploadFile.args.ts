import { InputType, ArgsType, Field, ID, ObjectType } from "type-graphql";

@InputType()
class UploadFileIdRecord {
  // @Field({ nullable: true })
  // fd: {
  //   lastModified: number;
  //   name: string;
  //   size: number;
  //   type: string;
  //   webkitRelativePath: string;
  // };
  @Field({ nullable: true })
  lastModified: number;

  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  size: number;

  @Field({ nullable: true })
  type: string;

  @Field({ nullable: true })
  webkitRelativePath: string;
}

@ArgsType()
export class UploadFileIdArgs {
  @Field({ nullable: true })
  record: UploadFileIdRecord;
}
