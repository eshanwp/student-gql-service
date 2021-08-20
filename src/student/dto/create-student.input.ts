import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class StudentCreateDTO {
  @Field()
  name: string;

  @Field()
  dob: Date;

  @Field()
  email: string;

  @Field()
  age: number;
}
