import { NestFactory } from '@nestjs/core';
import type { NestFastifyApplication } from '@nestjs/platform-fastify';
import { FastifyAdapter } from '@nestjs/platform-fastify';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import 'dayjs/locale/pt-br';
import { AppModule } from './app.module';

async function bootstrap() {
  const fastifyAdapter = new FastifyAdapter({ logger: false });

  const fastifyAdapterInstance = fastifyAdapter.getInstance();

  fastifyAdapterInstance.addHook(
    'preParsing',
    (request, reply, payload, done) => {
      if (
        ['POST', 'PATCH', 'DELETE'].includes(request.method) &&
        request.headers['content-type'] === 'application/json' &&
        request.headers['content-length'] === '0'
      ) {
        delete request.headers['content-type'];
      }

      done();
    },
  );

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(fastifyAdapterInstance),
    {
      rawBody: true,
    },
  );

  dayjs.extend(utc);
  dayjs.locale('pt-br');

  await app.listen(process.env.PORT || 3000, '::');
}
bootstrap();
