import { Test, TestingModule } from '@nestjs/testing';
import { MyLoggersService } from './my-loggers.service';

describe('MyLoggersService', () => {
  let service: MyLoggersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MyLoggersService],
    }).compile();

    service = module.get<MyLoggersService>(MyLoggersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
