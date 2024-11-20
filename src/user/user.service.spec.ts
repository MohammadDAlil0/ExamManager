import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import * as argon from 'argon2';
import { User } from './user.entity';
import { getModelToken } from '@nestjs/sequelize';


describe('UserService', () => {
  let service: UserService;
  let mockUserRepository: typeof User;
  let mockJwtService: JwtService;
  let mockConfigService: ConfigService;

  const mockUser = {
    id: 1,
    username: 'testuser',
    email: 'test@example.com',
    hash: 'hashedpassword',
  };

  beforeEach(async () => {
    mockUserRepository = {
      create: jest.fn().mockResolvedValue(mockUser),
      findOne: jest.fn().mockResolvedValue(mockUser),
    } as any;

    mockJwtService = {
      signAsync: jest.fn().mockResolvedValue('test_token'),
    } as any;

    mockConfigService = {
      get: jest.fn().mockReturnValue('test_secret'),
    } as any;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getModelToken(User),
          useValue: mockUserRepository,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('signup', () => {
    it('should create a user and return a token', async () => {
      jest.spyOn(argon, 'hash').mockResolvedValue('hashedpassword');
      const dto = { username: 'testuser', email: 'test@example.com', password: 'password123', confirmPassword: 'password123'};
      const result = await service.signup(dto);

      expect(mockUserRepository.create).toHaveBeenCalledWith({
        username: dto.username,
        email: dto.email,
        hash: 'hashedpassword',
      });
      expect(result).toEqual({ accessToken: 'test_token' });
    });
  });

  describe('login', () => {
    it('should return a token for a valid user', async () => {
      jest.spyOn(argon, 'verify').mockResolvedValue(true);
      const dto = { email: 'test@example.com', password: 'password123' };
      const result = await service.login(dto);

      expect(mockUserRepository.findOne).toHaveBeenCalledWith({
        where: { email: dto.email },
      });
      expect(result).toEqual({ accessToken: 'test_token' });
    });

    it('should throw NotFoundException if user is not found', async () => {
      mockUserRepository.findOne = jest.fn().mockResolvedValue(null);
      const dto = { email: 'nonexistent@example.com', password: 'password123' };

      await expect(service.login(dto)).rejects.toThrow(NotFoundException);
    });

    it('should throw BadRequestException for invalid password', async () => {
      jest.spyOn(argon, 'verify').mockResolvedValue(false);
      const dto = { email: 'test@example.com', password: 'wrongpassword' };

      await expect(service.login(dto)).rejects.toThrow(BadRequestException);
    });
  });

  describe('signToken', () => {
    it('should return a signed JWT token', async () => {
      const result = await service.signToken('1', 'test@example.com');

      expect(mockJwtService.signAsync).toHaveBeenCalledWith(
        { sub: '1', email: 'test@example.com' },
        { expiresIn: '15d', secret: 'test_secret' }
      );
      expect(result).toEqual({ accessToken: 'test_token' });
    });
  });
});
