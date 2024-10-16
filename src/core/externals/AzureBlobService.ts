import { Injectable } from '@nestjs/common';
import { MemoryStoredFile } from 'nestjs-form-data';

import AzureBlobRepository from '@adapters/externals/AzureBlobRepository';

@Injectable()
export default class AzureBlobService {
  constructor(private readonly azureBlobRepository: AzureBlobRepository) {}

  public async uploadProfilePicture(
    file: MemoryStoredFile,
    userId: string,
  ): Promise<string> {
    const extension: string = file.originalName.split('.').pop();
    const fileName: string = `${userId}-profilepicture.${extension}`;

    return this.azureBlobRepository.uploadBlob(file, fileName);
  }
}
