import { Field, ArgsType, InputType } from "type-graphql";

@InputType()
class RegisterUserRecord {
  @Field({ nullable: true })
  firstName: string;

  @Field({ nullable: true })
  lastName: string;

  @Field({ nullable: true })
  folderName: string;
}

@ArgsType()
export class RegisterUserArgs {
  @Field()
  record: RegisterUserRecord;
}
