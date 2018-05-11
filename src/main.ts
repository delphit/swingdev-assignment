import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import {
  AnyExceptionFilter,
  HttpValidationExceptionFilter,
  DatabaseExceptionFilter,
} from './app/common/filters';
import { APP_PORT, DOMAIN } from './app/common/config';
import expressApp from './app/common/config/express.config';
import { ValidationPipe } from './app/common/pipe/validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, expressApp);
  app.setGlobalPrefix('api');
  app.useGlobalFilters(
    new AnyExceptionFilter(),
    new HttpValidationExceptionFilter(),
    new DatabaseExceptionFilter(),
  );
  app.useGlobalPipes(new ValidationPipe());
  /* tslint:disable */
  await app.listen(APP_PORT, () => {
    console.log('|----------------------------------------------------------|');
    console.log(`|       Server listening: http://${DOMAIN}:${APP_PORT}/api |`);
    console.log('|----------------------------------------------------------|');
    console.log(`|       Launch: ${new Date()}                              |`);
    console.log('|----------------------------------------------------------|');
  });
  /* tslint:enable */
}
bootstrap();
