import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { StudentCreateDTO } from './dto/create-student.input';
import { StudentService } from './student.service';
import { Student } from './entities/student.entity';
import { UpdateStudentInput } from './dto/update-student.input';

@Resolver(() => Student)
export class StudentResolver {
  constructor(private employeeService: StudentService) {}

  @Query(() => [Student], { name: 'getAllStudents' })
  findAll() {
    return this.employeeService.findAll();
  }

  @Mutation(() => [Student], { name: 'createStudent' })
  create(
    @Args({ name: 'studentInput', type: () => [StudentCreateDTO] })
    studentCreateDTO: StudentCreateDTO[],
  ) {
    // create(@Args('studentInput') studentCreateDTO: StudentCreateDTO[]) {

    return this.employeeService.create(studentCreateDTO);
  }

  @Query(() => Student)
  findOne(@Args('id') id: string) {
    return this.employeeService.findOne(id);
  }

  @Mutation(() => Student)
  updateStudent(@Args('studentInput') updateStudentInput: UpdateStudentInput) {
    return this.employeeService.update(
      updateStudentInput.id,
      updateStudentInput,
    );
  }

  @Mutation(() => Student)
  removeStudent(@Args('id') id: string) {
    return this.employeeService.remove(id);
  }
}
