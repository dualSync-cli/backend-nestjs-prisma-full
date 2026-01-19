import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('General')
@Controller()
export class AppController {
    @Get()
    @ApiOperation({ summary: 'Welcome message' })
    getHello() {
        return { message: 'Welcome to the API' };
    }

    @Get('health')
    @ApiOperation({ summary: 'Health check' })
    getHealth() {
        return { status: 'ok', timestamp: new Date().toISOString() };
    }
}
