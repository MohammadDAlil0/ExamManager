import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as pactum from 'pactum';
import { AppModule } from './../src/app.module';
import { Sequelize } from 'sequelize';
import { DatabaseModule } from 'src/core/database/database.module';
import { SEQUELIZE } from 'src/core/constants/constants';


describe('UserController (e2e)', () => {
  let app: INestApplication;
  let sequelize: Sequelize;
  
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
    }).compile();
    

    sequelize = moduleFixture.get<Sequelize>(SEQUELIZE);
    app = moduleFixture.createNestApplication();

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true, 
        transform: true,
      })
    );

    await app.init();
    pactum.request.setBaseUrl('http://localhost:3000');
  });
  
  describe('user', () => {
    it('/user/signup (POST)', async () => {
      const signupDto = {
        username: 'user100',
        email: 'user100@example.com',
        password: '12345678',
        confirmPassword: '12345678',
        role: "ADMIN"
      };
  
      return pactum.spec()
        .post('/user/signup')
        .withBody(signupDto)
        .expectStatus(201);
    });


    it('/user/signup (POST)', async () => {
      const signupDto = {
        username: 'user101',
        email: 'user101@example.com',
        password: '12345678',
        confirmPassword: '12345678'
      };
  
      return pactum.spec()
        .post('/user/signup')
        .withBody(signupDto)
        .expectStatus(201)
        .stores('userId2', 'data.accessToken');
    });


    it('/user/login (POST)', async () => {
      const loginDto = {
        email: 'user100@example.com',
        password: '12345678'
      }

      return await pactum.spec()
        .post('/user/login')
        .withBody(loginDto)
        .expectStatus(201)
        .stores('userAt', 'data.accessToken')

    });

    it('/user (GET)', async () => {
        return await pactum.spec()
        .withHeaders({
          "Authorization": `Bearer $S{userAt}`
        })
        .get('/user')
        .expectStatus(200)
        .stores('userId', 'data[0].id')
    });

    it('/user/:id (Get)', async () => {
      return await pactum.spec()
      .get('/user')
      .withPathParams('id', '$S{userId}')
      .withHeaders({
        Authorization: 'Bearer $S{userAt}',
      });
    });

    it('/user/changeRole/:id (PUT)', async () => {
      return pactum.spec()
        .put('/user/changeRole')
        .withPathParams('id', '$S{userId2}')
        .withHeaders({
          Authorization: 'Bearer $S{userAt}',
        })
        .withBody({
          role: "TEACHER"
        });
    });

    it('/user/:id (Delete)', async () => {
      return await pactum.spec()
      .delete('/user')
      .withPathParams('id', '$S{userId}')
      .withHeaders({
        Authorization: 'Bearer $S{userAt}',
      });
    });
  });

  afterAll(async () => {
    await sequelize.truncate({ cascade: true });
    await app.close();
  });
});
