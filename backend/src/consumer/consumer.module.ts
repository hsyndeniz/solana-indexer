import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ConsumerController } from './consumer.controller';
import { ConsumerService } from './consumer.service';

@Module({
  imports: [
    PrismaModule,
    ClientsModule.register([
      {
        name: 'GEYSER_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'solana-indexer',
          },
        },
      },
    ]),
  ],
  controllers: [ConsumerController],
  providers: [ConsumerService],
  exports: [ConsumerService],
})
export class ConsumerModule {}
