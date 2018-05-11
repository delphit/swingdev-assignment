import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { AnyExceptionFilter, HttpValidationExceptionFilter, DatabaseExceptionFilter } from './app/common/filters';
import { ValidationPipe } from './app/common/pipe/validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(
    new AnyExceptionFilter(),
    new HttpValidationExceptionFilter(),
    new DatabaseExceptionFilter(),
  );
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
