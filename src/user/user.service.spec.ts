import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import * as argon from 'argon2';
import { User } from './user.entity';
import { getModelToken } from '@nestjs/sequelize';
import { USER_REPOSITORY } from 'src/core/constants/constants';
import { QueryParamsDto } from 'src/core/global-dto/query-params.dto';
import { Exam } from 'src/exam/exam.entity';
import { Op } from 'sequelize';


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

  const mockUsers = [
    {
      id: 1,
      username: 'testuser1',
      email: 'test1@example.com',
    },
    {
      id: 2,
      username: 'testuser2',
      email: 'test2@example.com',
    }
  ]

  beforeAll(async () => {
    mockUserRepository = {
      create: jest.fn().mockResolvedValue(mockUser),
      findOne: jest.fn().mockResolvedValue(mockUser),
      findAll: jest.fn().mockResolvedValue(mockUsers)
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
          provide: USER_REPOSITORY,
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

      await expect(service.login(dto)).rejects.toThrow(NotFoundException);
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

  describe('getAllUsers', () => {
    const mockQueryParamsDto: QueryParamsDto = {
      fields: ['id', 'username', 'email', 'role'],
      populate: true,
      search: 'test',
      page: 1,
      limit: 10,
    };
  
    const mockUsers = [
      {
        id: 1,
        username: 'testuser1',
        email: 'testuser1@example.com',
        role: 'admin',
        hash: 'mockHash1',
        Exams: [],
      },
      {
        id: 2,
        username: 'testuser2',
        email: 'testuser2@example.com',
        role: 'user',
        hash: 'mockHash2',
        Exams: [],
      },
    ];
  
    beforeEach(() => {
      jest.clearAllMocks();
    });
  
    it('should return filtered fields and exclude hash', async () => {
      mockUserRepository.findAll = jest.fn().mockResolvedValue(mockUsers.map(user => ({
        toJSON: () => user,
      })));
  
      const result = await service.getAllUsers(mockQueryParamsDto);
  
      expect(mockUserRepository.findAll).toHaveBeenCalledWith({
        include: [{ model: Exam }],
        attributes: ['id', 'username', 'email', 'role'],
        offset: undefined,
        limit: 10,
        where: {
          [Op.or]: [
            { username: { [Op.like]: '%test%' } },
            { email: { [Op.like]: '%test%' } },
            { role: { [Op.like]: '%test%' } },
          ],
        },
      });
  
      expect(result).toEqual(
        mockUsers.map(({ hash, ...rest }) => rest) // Expect users without the `hash` field
      );
    });
  
    it('should return all fields if "fields" is not provided', async () => {
      const queryWithoutFields = { ...mockQueryParamsDto, fields: undefined };
      mockUserRepository.findAll = jest.fn().mockResolvedValue(mockUsers.map(user => ({
        toJSON: () => user,
      })));
  
      const result = await service.getAllUsers(queryWithoutFields);
  
      expect(mockUserRepository.findAll).toHaveBeenCalledWith(
        expect.objectContaining({
          attributes: undefined,
        })
      );
  
      expect(result).toEqual(
        mockUsers.map(({ hash, ...rest }) => rest)
      );
    });
  
    it('should handle no "populate" and exclude include clause', async () => {
      const queryWithoutPopulate = { ...mockQueryParamsDto, populate: false };
      mockUserRepository.findAll = jest.fn().mockResolvedValue(mockUsers.map(user => ({
        toJSON: () => user,
      })));
  
      const result = await service.getAllUsers(queryWithoutPopulate);
  
      expect(mockUserRepository.findAll).toHaveBeenCalledWith(
        expect.objectContaining({
          include: undefined,
        })
      );
  
      expect(result).toEqual(
        mockUsers.map(({ hash, ...rest }) => rest)
      );
    });
  
    it('should handle no "search" and exclude where clause', async () => {
      const queryWithoutSearch = { ...mockQueryParamsDto, search: undefined };
      mockUserRepository.findAll = jest.fn().mockResolvedValue(mockUsers.map(user => ({
        toJSON: () => user,
      })));
  
      const result = await service.getAllUsers(queryWithoutSearch);
  
      expect(mockUserRepository.findAll).toHaveBeenCalledWith(
        expect.objectContaining({
          where: {},
        })
      );
  
      expect(result).toEqual(
        mockUsers.map(({ hash, ...rest }) => rest)
      );
    });
  
    it('should handle pagination correctly', async () => {
      const paginatedQuery = { ...mockQueryParamsDto, page: 2, limit: 5 };
      mockUserRepository.findAll = jest.fn().mockResolvedValue(mockUsers.map(user => ({
        toJSON: () => user,
      })));
  
      const result = await service.getAllUsers(paginatedQuery);
  
      expect(mockUserRepository.findAll).toHaveBeenCalledWith(
        expect.objectContaining({
          offset: 5,
          limit: 5,
        })
      );
  
      expect(result).toEqual(
        mockUsers.map(({ hash, ...rest }) => rest)
      );
    });
  });
});
