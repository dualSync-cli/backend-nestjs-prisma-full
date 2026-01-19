import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto, LoginDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
    ) { }

    async register(registerDto: RegisterDto) {
        const { email, password, name } = registerDto;

        const existingUser = await this.prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            throw new BadRequestException('Email already registered');
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const user = await this.prisma.user.create({
            data: { email, name, password: hashedPassword },
        });

        const token = this.jwtService.sign({ id: user.id, email: user.email });

        return {
            user: { id: user.id, email: user.email, name: user.name },
            token,
        };
    }

    async login(loginDto: LoginDto) {
        const { email, password } = loginDto;

        const user = await this.prisma.user.findUnique({ where: { email } });
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const token = this.jwtService.sign({ id: user.id, email: user.email });

        return {
            user: { id: user.id, email: user.email, name: user.name },
            token,
        };
    }

    async getUser(id: number) {
        const user = await this.prisma.user.findUnique({
            where: { id },
            select: { id: true, email: true, name: true, createdAt: true },
        });
        if (!user) {
            throw new BadRequestException('User not found');
        }
        return user;
    }
}
