import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

//Saves a new user to the database.
  async create(data: {
    name: string;
    email: string;
    password: string;
  }) {
    return this.prisma.user.create({
      data,
    });
  }
  // Finds a user by email
  async findByEmail(email: string) {
  return this.prisma.user.findUnique({
    where: {
      email,
    },
  });
}
//Finds a user by ID
async findById(id: number) {
  return this.prisma.user.findUnique({
    where: {
      id,
    },
  });
}

}