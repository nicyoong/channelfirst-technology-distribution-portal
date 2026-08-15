import { generateJsonLd, generateProductJsonLd, generateBreadcrumbJsonLd } from '../metadata';

describe('Metadata Utils - Edge Cases and Security', () => {
  describe('generateJsonLd', () => {
    it('generates valid JSON-LD structure', () => {
      const result = generateJsonLd();

      expect(result).toBeDefined();
      expect(result['@context']).toBe('https://schema.org');
      expect(result['@type']).toBe('Organization');
    });

    it('includes all required organization fields', () => {
      const result = generateJsonLd();

      expect(result.name).toBeDefined();
      expect(result.url).toBeDefined();
      expect(result.description).toBeDefined();
      expect(result.address).toBeDefined();
      expect(result.contactPoint).toBeDefined();
    });

    it('includes social media links', () => {
      const result = generateJsonLd();

      expect(result.sameAs).toBeDefined();
      expect(result.sameAs.length).toBeGreaterThan(0);
      expect(result.sameAs[0]).toContain('facebook');
      expect(result.sameAs[1]).toContain('linkedin');
    });

    it('includes knowsAbout topics', () => {
      const result = generateJsonLd();

      expect(result.knowsAbout).toBeDefined();
      expect(result.knowsAbout.length).toBeGreaterThan(0);
      expect(result.knowsAbout).toContain('Networking Equipment');
      expect(result.knowsAbout).toContain('Enterprise Servers');
    });
  });

  describe('generateProductJsonLd', () => {
    it('handles product with all fields', () => {
      const product = {
        name: 'Complete Product',
        description: 'Full description',
        brand: 'Test Brand',
        category: 'Electronics',
        availability: 'https://schema.org/InStock',
        price: '99.99',
        priceCurrency: 'MYR',
      };

      const result = generateProductJsonLd(product);

      expect(result['@type']).toBe('Product');
      expect(result.name).toBe('Complete Product');
      expect(result.brand.name).toBe('Test Brand');
      expect(result.category).toBe('Electronics');
      expect(result.offers.price).toBe('99.99');
      expect(result.offers.priceCurrency).toBe('MYR');
    });

    it('handles product without optional fields', () => {
      const product = {
        name: 'Minimal Product',
        description: 'Minimal description',
        brand: 'Minimal Brand',
        category: 'Category',
      };

      const result = generateProductJsonLd(product);

      expect(result.name).toBe('Minimal Product');
      expect(result.availability).toBe('https://schema.org/InStock');
      expect(result.offers).toBeUndefined();
    });

    it('handles product with availability override', () => {
      const product = {
        name: 'Product',
        description: 'Desc',
        brand: 'Brand',
        category: 'Cat',
        availability: 'https://schema.org/OutOfStock',
      };

      const result = generateProductJsonLd(product);

      expect(result.availability).toBe('https://schema.org/OutOfStock');
    });

    it('handles product with empty price (should not include offers)', () => {
      const product = {
        name: 'Product',
        description: 'Desc',
        brand: 'Brand',
        category: 'Cat',
        price: undefined,
      };

      const result = generateProductJsonLd(product as any);

      expect(result.offers).toBeUndefined();
    });

    it('handles product with empty string price', () => {
      const product = {
        name: 'Product',
        description: 'Desc',
        brand: 'Brand',
        category: 'Cat',
        price: '',
      };

      const result = generateProductJsonLd(product as any);

      expect(result.offers).toBeUndefined();
    });

    it('handles very long product names', () => {
      const product = {
        name: 'A'.repeat(1000),
        description: 'Short',
        brand: 'Brand',
        category: 'Cat',
      };

      const result = generateProductJsonLd(product);

      expect(result.name.length).toBe(1000);
    });
  });

  describe('generateBreadcrumbJsonLd', () => {
    it('generates breadcrumb with multiple levels', () => {
      const items = [
        { label: 'Home', url: '/' },
        { label: 'Products', url: '/products' },
        { label: 'Networking', url: '/products/networking' },
        { label: 'Switches', url: '/products/networking/switches' },
      ];

      const result = generateBreadcrumbJsonLd(items);

      expect(result.itemListElement).toHaveLength(4);
      expect(result.itemListElement[0].position).toBe(1);
      expect(result.itemListElement[3].position).toBe(4);
    });

    it('handles single breadcrumb item', () => {
      const items = [{ label: 'Single Page', url: '/single' }];

      const result = generateBreadcrumbJsonLd(items);

      expect(result.itemListElement).toHaveLength(1);
      expect(result.itemListElement[0].position).toBe(1);
    });

    it('handles empty breadcrumb array', () => {
      const result = generateBreadcrumbJsonLd([]);

      expect(result.itemListElement).toHaveLength(0);
    });

    it('generates proper item structure', () => {
      const items = [{ label: 'Home', url: '/' }];

      const result = generateBreadcrumbJsonLd(items);

      const item = result.itemListElement[0];
      expect(item['@type']).toBe('ListItem');
      expect(item.position).toBe(1);
      expect(item.name).toBe('Home');
      expect(item.item).toBe('/');
    });

    it('handles special characters in labels', () => {
      const items = [
        { label: 'Home & Garden', url: '/' },
        { label: 'Products <Test>', url: '/products' },
      ];

      const result = generateBreadcrumbJsonLd(items);

      expect(result.itemListElement[0].name).toBe('Home & Garden');
      expect(result.itemListElement[1].name).toBe('Products <Test>');
    });
  });
});
