import { generateJsonLd, generateProductJsonLd, generateBreadcrumbJsonLd } from '../metadata';

describe('metadata utilities', () => {
  describe('generateJsonLd', () => {
    it('generates valid JSON-LD for organization', () => {
      const result = generateJsonLd();

      expect(result).toBeTruthy();
      expect(result['@context']).toBe('https://schema.org');
      expect(result['@type']).toBe('Organization');
      expect(result.name).toBe('ChannelFirst Technology Sdn Bhd');
      expect(result.url).toBe('https://www.channelfirst.com.my');
    });

    it('includes address information', () => {
      const result = generateJsonLd();

      expect(result.address).toBeTruthy();
      expect(result.address.addressLocality).toBe('Subang Jaya');
      expect(result.address.addressCountry).toBe('MY');
    });

    it('includes contact point', () => {
      const result = generateJsonLd();

      expect(result.contactPoint).toBeTruthy();
      expect(result.contactPoint.telephone).toBe('+60-3-2780-8888');
    });
  });

  describe('generateProductJsonLd', () => {
    it('generates product JSON-LD', () => {
      const product = {
        name: 'Test Product',
        description: 'A test product',
        brand: 'Test Brand',
        category: 'Test Category',
        availability: 'https://schema.org/InStock',
        price: '99.99',
        priceCurrency: 'MYR',
      };

      const result = generateProductJsonLd(product);

      expect(result).toBeTruthy();
      expect(result['@type']).toBe('Product');
      expect(result.name).toBe('Test Product');
      expect(result.brand.name).toBe('Test Brand');
      expect(result.category).toBe('Test Category');
      expect(result.availability).toBe('https://schema.org/InStock');
    });

    it('handles missing optional fields', () => {
      const product = {
        name: 'Minimal Product',
        description: 'A minimal product',
        brand: 'Minimal Brand',
        category: 'Minimal Category',
      };

      const result = generateProductJsonLd(product);

      expect(result).toBeTruthy();
      expect(result.name).toBe('Minimal Product');
      // Should have default availability
      expect(result.availability).toBe('https://schema.org/InStock');
      // Should not have offers when price is missing
      expect(result.offers).toBeUndefined();
    });

    it('includes offers when price is provided', () => {
      const product = {
        name: 'Priced Product',
        description: 'A product with price',
        brand: 'Priced Brand',
        category: 'Priced Category',
        price: '199.99',
        priceCurrency: 'MYR',
      };

      const result = generateProductJsonLd(product);

      expect(result.offers).toBeTruthy();
      expect(result.offers.price).toBe('199.99');
      expect(result.offers.priceCurrency).toBe('MYR');
    });
  });

  describe('generateBreadcrumbJsonLd', () => {
    it('generates breadcrumb JSON-LD', () => {
      const items = [
        { label: 'Home', url: '/' },
        { label: 'Products', url: '/products' },
        { label: 'Category', url: '/products/category' },
      ];

      const result = generateBreadcrumbJsonLd(items);

      expect(result).toBeTruthy();
      expect(result['@type']).toBe('BreadcrumbList');
      expect(result.itemListElement).toHaveLength(3);
      expect(result.itemListElement[0].name).toBe('Home');
      expect(result.itemListElement[2].name).toBe('Category');
    });

    it('handles single breadcrumb item', () => {
      const items = [{ label: 'Single Page', url: '/single' }];

      const result = generateBreadcrumbJsonLd(items);

      expect(result.itemListElement).toHaveLength(1);
      expect(result.itemListElement[0].name).toBe('Single Page');
    });

    it('handles empty breadcrumb items', () => {
      const result = generateBreadcrumbJsonLd([]);

      expect(result).toBeTruthy();
      expect(result.itemListElement).toHaveLength(0);
    });
  });
});
