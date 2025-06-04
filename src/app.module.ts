import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { QuestionsModule } from './questions/questions.module';
import { ClaimsModule } from './claims/claims.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri:
          configService.get<string>('MONGO_URL') ||
          'mongodb://localhost:27017/consult-tributario',
      }),
      inject: [ConfigService],
    }),
    QuestionsModule,
    ClaimsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
