import { Body, Controller, Put, Patch } from '@nestjs/common';
import { CalcService } from './calc.service';

@Controller('calc')
export class CalcController {
  constructor(private readonly appService: CalcService) {}
}
