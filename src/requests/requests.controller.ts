import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { ConversionRateCurr } from '../models/conversion-rate.model';
import { RequestsService } from './requests.service';

@Controller('conversionRate')
export class RequestsController {
  constructor(private readonly requestsService: RequestsService) {}

  @Post()
  ConversionRate(@Body() conversionRateCurr: ConversionRateCurr) {
    return !!this.requestsService.sendConverionRates(conversionRateCurr);
  }
}
