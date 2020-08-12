import { environment } from '../../environments/environment';

export class ApiConstants {
  public static readonly URL = environment.baseUrl;
  public static readonly HEADER_KEY = environment.apiHeaderKey;
  public static readonly HEADER_VALUE = environment.apiHeaderValue;
}
