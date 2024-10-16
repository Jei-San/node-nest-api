import {
  BlobServiceClient,
  BlockBlobClient,
  ContainerClient,
} from '@azure/storage-blob';
import { Injectable } from '@nestjs/common';
import { MemoryStoredFile } from 'nestjs-form-data';

@Injectable()
export default class AzureBlobRepository {
  private readonly containerClient: ContainerClient;

  constructor() {
    const blobService = BlobServiceClient.fromConnectionString(
      process.env.AZURE_BLOB_CONNECTION_STRING,
    );
    this.containerClient = blobService.getContainerClient(
      process.env.AZURE_CONTAINER_NAME,
    );
  }

  private async getBlobClient(fileName: string): Promise<BlockBlobClient> {
    const blockBlobClient: BlockBlobClient =
      this.containerClient.getBlockBlobClient(fileName);
    return blockBlobClient;
  }

  public async uploadBlob(file: MemoryStoredFile, fileName: string) {
    const blockBlobClient: BlockBlobClient = await this.getBlobClient(fileName);
    await blockBlobClient.uploadData(file.buffer);
    return blockBlobClient.url;
  }
}
