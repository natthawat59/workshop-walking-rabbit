import { GetProductDTO } from '../dto/get.product.dto';
import {
  RequestGetProductDTO,
  RequestProductDTO,
} from '../dto/request.product.dto';
import { ApiResponse } from '~/services/main/dto/api.response';

export class ProductRepository {
  private $axios: any;

  constructor($axios: any) {
    this.$axios = $axios;
  }

  async getProduct(params: GetProductDTO): Promise<ApiResponse<GetProductDTO>> {
    // const dataResult = await this.$axios.$get(`products/${params.id}`);
    const dataResult = await this.$axios.$get(
      `http://localhost:5000/api/boilerplate/v1/products/${params}`,
    );
    console.log('result: ', this.$axios);
    return dataResult;
  }

  async postProduct(
    request: RequestProductDTO,
  ): Promise<ApiResponse<GetProductDTO>> {
    const dataResult = await this.$axios.$post(
      'http://localhost:5000/api/boilerplate/v1/products',
      { data: request },
    );
    return dataResult;
  }

  async getProductList(
    request: RequestGetProductDTO,
  ): Promise<ApiResponse<GetProductDTO>> {
    const dataResult = await this.$axios.$get(
      'http://localhost:5000/api/boilerplate/v1/products',
      {
        params: {
          ...request,
        },
      },
    );
    return dataResult;
  }

  async updateProductDetail(
    request: RequestProductDTO,
  ): Promise<ApiResponse<GetProductDTO>> {
    const dataResult = await this.$axios.$put(
      `http://localhost:5000/api/boilerplate/v1/products`,
      {
        data: request,
      },
    );
    return dataResult;
  }

  async deleteProduct(
    params: GetProductDTO,
  ): Promise<ApiResponse<GetProductDTO>> {
    const dataResult = await this.$axios.$delete(
      `http://localhost:5000/api/boilerplate/v1/products/${params}`,
    );
    return dataResult;
  }
}
