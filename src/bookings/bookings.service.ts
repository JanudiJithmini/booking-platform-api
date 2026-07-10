import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingStatusDto } from './dto/update-booking-status.dto';
import { BookingStatus } from '@prisma/client';

@Injectable()
export class BookingsService {
  constructor(private prisma: PrismaService) {}

  /**
   * Create a new booking
   */
  async create(createBookingDto: CreateBookingDto) {
    // Check whether the selected service exists
    const service = await this.prisma.service.findUnique({
      where: {
        id: createBookingDto.serviceId,
      },
    });

    if (!service) {
      throw new NotFoundException('Service not found');
    }

    // Check whether the booking date is in the past
    const bookingDate = new Date(createBookingDto.bookingDate);

    if (bookingDate < new Date()) {
      throw new BadRequestException(
        'Booking date cannot be in the past',
      );
    }

    // Create booking
    return this.prisma.booking.create({
      data: {
        customerName: createBookingDto.customerName,
        customerEmail: createBookingDto.customerEmail,
        customerPhone: createBookingDto.customerPhone,
        serviceId: createBookingDto.serviceId,
        bookingDate: bookingDate,
        bookingTime: createBookingDto.bookingTime,
        notes: createBookingDto.notes,
      },
    });
  }

  /**
   * Get all bookings
   */
  async findAll() {
    return this.prisma.booking.findMany({
      include: {
        service: true,
      },
    });
  }

  /**
   * Get one booking
   */
  async findOne(id: number) {
    const booking = await this.prisma.booking.findUnique({
      where: {
        id,
      },
      include: {
        service: true,
      },
    });

    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    return booking;
  }

  /**
   * Update booking status
   */
  async updateStatus(
    id: number,
    updateBookingStatusDto: UpdateBookingStatusDto,
  ) {
    const booking = await this.findOne(id);

    // Prevent CANCELLED -> COMPLETED
    if (
      booking.status === BookingStatus.CANCELLED &&
      updateBookingStatusDto.status === BookingStatus.COMPLETED
    ) {
      throw new BadRequestException(
        'Cancelled bookings cannot be completed',
      );
    }

    return this.prisma.booking.update({
      where: {
        id,
      },
      data: {
        status: updateBookingStatusDto.status,
      },
    });
  }

  /**
   * Cancel booking
   */
  async cancelBooking(id: number) {
    await this.findOne(id);

    return this.prisma.booking.update({
      where: {
        id,
      },
      data: {
        status: BookingStatus.CANCELLED,
      },
    });
  }
}