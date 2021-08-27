import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StudentCreateDTO } from './dto/create-student.input';
import { Student } from './entities/student.entity';
import { UpdateStudentInput } from './dto/update-student.input';
import { request, gql } from 'graphql-request';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
  ) {}

  async findAll(): Promise<Student[]> {
    return this.studentRepository.find();
  }

  async findOne(id: string) {
    return this.studentRepository.findOne(id);
  }

  async create(studentCreateDTO: StudentCreateDTO[]): Promise<Student[]> {
    // const student = this.studentRepository.create(studentCreateDTO);

    
    console.log('DTO',studentCreateDTO)
    const variables = {
      createStudentsArray: studentCreateDTO,
    };

    const query = gql`
      mutation createStudents($createStudentsArray:  [StudentInput!]!) {
        createStudents(input: { createMultiple: $createStudentsArray }) {
          __typename
        }
      }
    `;

    try {
      const data = await request(
        'http://localhost:5000/graphiql',
        query,
        variables,
      );

      console.log('this magic', data);
      return data;
    } catch (error) {
      console.error(error);
      return error;
    }

    // return await this.studentRepository.save(student);
  }

  update(id: string, updateStudentInput: UpdateStudentInput) {
    const student: Student = this.studentRepository.create(updateStudentInput);
    student.id = id;
    return this.studentRepository.save(student);
  }

  async remove(id: string) {
    const student = this.findOne(id);
    if (student) {
      const ret = await this.studentRepository.delete(id);
      if (ret.affected === 1) {
        return student;
      }
    }
    throw new NotFoundException(`Record cannot find by id ${id}`);
  }
}
