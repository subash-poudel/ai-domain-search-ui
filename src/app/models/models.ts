export interface DomainResponse {
  domains: {
    domains: DomainItem[];
  };
}

export interface DomainItem {
  available: boolean;
  currency: string;
  price: number;
  definitive: boolean;
  domain: string;
}
