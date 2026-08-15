const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: "/product-category/digital-weighin-scales/vetanimal-scales",
        destination:
          "/product-category/digital-weighing-scales/vet-animal-scales",
        permanent: true,
      },
      {
        source:
          "/product-category/digital-weighing-scales/medicalpersonal-weighing-scales",
        destination:
          "/product-category/digital-weighing-scales/medical-personal-weighing-scales",
        permanent: true,
      },
      {
        source:
          "/product-category/digital-weighing-scales/household-scales/kitchen-scales-bathroom-scales",
        destination:
          "/product-category/digital-weighing-scales/kitchen-bathroom-scales",
        permanent: true,
      },
      {
        source: "/product-category/digital-weighing-scales/foodportion-scales",
        destination:
          "/product-category/digital-weighing-scales/food-portion-scales",
        permanent: true,
      },
      {
        source: "/product-category/digital-weighing-scales/floor-pallet-scales",
        destination:
          "/product-category/digital-weighing-scales/floor-scales-pallet-scales",
        permanent: true,
      },
      {
        source:
          "/product-category/digital-weighing-scales/freightparcel-scales",
        destination:
          "/product-category/digital-weighing-scales/freight-parcel-scales",
        permanent: true,
      },
      {
        source: "/product-category/label-printers-consumables",
        destination: "/product-category/label-receipt-printers-consumables",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
