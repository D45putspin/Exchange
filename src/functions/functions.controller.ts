import { Controller, Get } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ConversionRateCurr } from '../models/conversion-rate.model';
import { FunctionsService } from './functions.service';

@Controller()
export class FunctionsController {}
