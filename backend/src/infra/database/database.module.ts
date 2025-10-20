import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { PrismaNotesRepository } from '@/modules/notes/infra/repositories/prisma-notes.repository';
import { NotesRepository } from '@/modules/notes/repositories/notes.repository';
import { AuthorizationRepository } from '@/modules/authorization/repositories/authorization.repository';
import { AuthenticationRepository } from '@/modules/authentication/repositories/authentication.repository';
import { PrismaAuthenticationRepository } from '@/modules/authentication/infra/repositories/prisma-authentication.repository';
import { PrismaAuthorizationRepository } from '@/modules/authorization/infra/repositories/authorization.repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: NotesRepository,
      useClass: PrismaNotesRepository,
    },
    {
      provide: AuthenticationRepository,
      useClass: PrismaAuthenticationRepository,
    },
    {
      provide: AuthorizationRepository,
      useClass: PrismaAuthorizationRepository,
    },
  ],
  exports: [
    PrismaService,
    NotesRepository,
    AuthenticationRepository,
    AuthorizationRepository,
  ],
})
export class DatabaseModule {}
