export interface IExternalApi {
  getProducts(): Promise<any[]>;
}