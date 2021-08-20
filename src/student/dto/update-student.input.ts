import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateStudentInput {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  dob: Date;

  @Field()
  email: string;

  @Field()
  age: number;
}
