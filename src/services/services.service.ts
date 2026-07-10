import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';

@Injectable()
export class ServicesService {

  // Inject PrismaService to communicate with the PostgreSQL database
  constructor(private prisma: PrismaService) {}

  /**
   * Create a new service
   * Only authenticated users can create services.
   * The userId is taken from the logged-in user (JWT).
   */
  async create(createServiceDto: CreateServiceDto, userId: number) {
    return this.prisma.service.create({
      data: {
        // Copy all values from the DTO
        ...createServiceDto,

        // Store the ID of the user who created the service
        createdById: userId,
      },
    });
  }

  /**
   * Get all services
   */
  async findAll() {
    return this.prisma.service.findMany();
  }

  /**
   * Get one service by its ID
   * Throws an exception if the service does not exist.
   */
  async findOne(id: number) {

    // Search the service
    const service = await this.prisma.service.findUnique({
      where: {
        id,
      },
    });

    // If no service is found, return a 404 error
    if (!service) {
      throw new NotFoundException('Service not found');
    }

    return service;
  }

  /**
   * Update an existing service
   */
  async update(
    id: number,
    updateServiceDto: UpdateServiceDto,
  ) {

    // Check whether the service exists
    await this.findOne(id);

    // Update the service
    return this.prisma.service.update({
      where: {
        id,
      },
      data: updateServiceDto,
    });
  }

  /**
   * Delete a service
   */
  async remove(id: number) {

    // Check whether the service exists
    await this.findOne(id);

    // Delete the service
    return this.prisma.service.delete({
      where: {
        id,
      },
    });
  }
}