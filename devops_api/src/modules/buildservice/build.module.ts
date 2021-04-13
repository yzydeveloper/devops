import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
import { BuildGatway } from './build.gatway';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';

@Module({
  providers: [BuildGatway],
})
export class BuildModule {}
