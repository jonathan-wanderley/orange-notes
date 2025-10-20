import { NotesRepository } from '@/modules/notes/repositories/notes.repository';
import { PaymentRequiredException } from '@/shared/http/exceptions/payment-required.exception';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
export class NotesLimitGuard implements CanActivate {
  constructor(private notesRepository: NotesRepository) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId = request.user?.id;

    const subscription = await this.notesRepository.findSubscriptionByUserId(
      userId,
    );

    if (!subscription) {
      const userNotes = await this.notesRepository.getAllNotes(userId);

      if (userNotes.length >= 10) {
        throw new PaymentRequiredException('Notes limit reached');
      }

      return true;
    }

    return true;
  }
}
