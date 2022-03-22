import { Injectable } from '@nestjs/common';

@Injectable()
export class CalcService {
  calc(arg1: number, arg2: number, op: string): number {
    let res = NaN;
    arg1 = Number(arg1);
    arg2 = Number(arg2);
    switch (op) {
      case 'add':
        res = arg1 + arg2;
        break;
      case 'sub':
        res = arg1 - arg2;
        break;
      case 'mul':
        res = arg1 * arg2;
        break;
      default:
        break;
    }
    return res;
  }
}
