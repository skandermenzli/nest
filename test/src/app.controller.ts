import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Controller('first')
export class AppController {
  constructor(private readonly configservice:ConfigService){}
  @Get('hello')
  getHello(): any {
    console.log(this.configservice.get('APP_PORT'));
    
    return {
      msg: 'aaa louled',
      to: 'louled',
    };
  }
}
