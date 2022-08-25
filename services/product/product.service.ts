import { ProductBackstage } from './backstages/product.backstage';
import { ProductRepository } from './repositories/product.repository';
import { GetProductDTO } from '~/services/product/dto/get.product.dto';
import {
  RequestGetProductDTO,
  RequestProductDTO,
} from './dto/request.product.dto';
import { ApiResponse } from '../main/dto/api.response';

export class ProductService extends ProductBackstage {
  private productRepository = new ProductRepository(this.$axios);

  async getProduct(params: GetProductDTO): Promise<ApiResponse<GetProductDTO>> {
    let dataResult: any = new GetProductDTO();
    try {
      dataResult = await this.productRepository.getProduct(params);
    } catch (err) {
      dataResult.message = 'failed';
    }

    return dataResult;
  }

  async postProduct(
    request: RequestProductDTO,
  ): Promise<ApiResponse<GetProductDTO>> {
    let dataResult: any = new GetProductDTO();
    try {
      dataResult = await this.productRepository.postProduct(request);
    } catch (err) {
      dataResult.message = 'failed';
    }

    return dataResult;
  }

  async getProductList(
    request: RequestGetProductDTO,
  ): Promise<ApiResponse<GetProductDTO>> {
    let dataResult: any = new GetProductDTO();
    try {
      dataResult = await this.productRepository.getProductList(request);
    } catch (err) {
      console.log(err);
      dataResult.message = 'failed';
    }

    return dataResult;
  }

  async updateProductDetail(
    request: RequestProductDTO,
  ): Promise<ApiResponse<GetProductDTO>> {
    let dataResult: any = new GetProductDTO();
    try {
      dataResult = await this.productRepository.updateProductDetail(request);
    } catch (err) {
      dataResult.message = 'failed';
    }

    return dataResult;
  }

  async deleteProduct(
    params: GetProductDTO,
  ): Promise<ApiResponse<GetProductDTO>> {
    let dataResult: any = new GetProductDTO();
    try {
      dataResult = await this.productRepository.deleteProduct(params);
    } catch (err) {
      console.log(err);
      dataResult.message = 'failed';
    }

    return dataResult;
  }
}
