import { Injectable } from '@nestjs/common';

import MailRepository from '@adapters/externals/MailRepository';

@Injectable()
export default class MailService {
  constructor(private readonly mailRepository: MailRepository) {}

  public async sendEmail(
    emails: string[],
    subject: string,
    template: string,
  ): Promise<void> {
    await this.mailRepository.sendEmail(emails, subject, template);
  }
}
