import { Product, SeedFertilizer } from '../../../models';

const calculateTotalAmount = async (seedFertilizerId: number, land: number, quantity: number): Promise<SeedFertilizer | null> => {
  const combination = await SeedFertilizer.findByPk(seedFertilizerId);
  const seedProductId = combination.seedProductId;
  const fertilizerProductId = combination.fertilizerProductId;

  if (seedProductId === null && fertilizerProductId === null) {
    return null;
  }

  const seedProduct = seedProductId ? await getProductDetails(seedProductId) : null;
  const fertilizerProduct = fertilizerProductId ? await getProductDetails(fertilizerProductId) : null;
  let finalTotalFertAmount: number=0;
  let finalTotalSeedAmount: number=0;
  if (seedProduct) {
    const seedQuantity = land * seedProduct.kgAcre;
    const totalSeedAmount = seedQuantity * seedProduct.cost;
    finalTotalSeedAmount =Number(totalSeedAmount.toFixed(2));
  }

  if (fertilizerProduct) {
    const fertilizerQuantity = land * fertilizerProduct.kgAcre;
    const totalFertilizeAmount = fertilizerQuantity * fertilizerProduct.cost;
    finalTotalFertAmount = Number(totalFertilizeAmount.toFixed(2));
  }
  const totalOrderAmount= finalTotalFertAmount+finalTotalSeedAmount;
  return totalOrderAmount;
};

const getProductDetails = async (productId: number): Promise<Product> => {
  return await Product.findByPk(productId);
};

export default calculateTotalAmount;
