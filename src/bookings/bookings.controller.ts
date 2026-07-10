import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingStatusDto } from './dto/update-booking-status.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('bookings')
export class BookingsController {
  constructor(
    private readonly bookingsService: BookingsService,
  ) {}

  /**
   * Create Booking
   * Public API (No Authentication Required)
   */
  @Post()
  create(@Body() createBookingDto: CreateBookingDto) {
    return this.bookingsService.create(createBookingDto);
  }

  /**
   * Get All Bookings
   * Protected API
   */
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.bookingsService.findAll();
  }

  /**
   * Get Booking By ID
   * Protected API
   */
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.bookingsService.findOne(id);
  }

  /**
   * Update Booking Status
   * Protected API
   */
  @UseGuards(JwtAuthGuard)
  @Patch(':id/status')
  updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBookingStatusDto: UpdateBookingStatusDto,
  ) {
    return this.bookingsService.updateStatus(
      id,
      updateBookingStatusDto,
    );
  }

  /**
   * Cancel Booking
   * Protected API
   */
  @UseGuards(JwtAuthGuard)
  @Patch(':id/cancel')
  cancelBooking(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.bookingsService.cancelBooking(id);
  }
}