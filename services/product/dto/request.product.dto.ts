export class RequestGetProductDTO {
    id: number = 0;
    name: string = '';
    status: number = 0;
    page: number = 0; 
    limit: number = 0; 
    count: boolean = true; 
}

export class RequestProductDTO {
    id?: number = 0;
    name: string = '';
    description: string = '';
    sku: string = '';
    image_urls: string = '';
    status: number = 0;
}