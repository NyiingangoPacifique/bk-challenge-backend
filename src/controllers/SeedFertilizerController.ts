import { Request, Response } from 'express';
import { SeedFertilizer,Product } from '../../models';

class SeedFertilizerController {
   async getAllCombinations(req: Request, res: Response): Promise<void> {
    try {
      const combinations = await SeedFertilizer.findAll();
      res.json(combinations);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve seed-fertilizer combinations' });
    }
  }

  public async getCombinationById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    try {
      const combination = await SeedFertilizer.findByPk(id);
      if (combination) {
        res.json(combination);
      } else {
        res.status(404).json({ error: 'Seed-fertilizer combination not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve seed-fertilizer combination' });
    }
  }

  public async createCombination(req: Request, res: Response): Promise<void> {
    const { seedProductId, fertilizerProductId } = req.body;
    try {
        const seedProduct = await Product.findByPk(seedProductId);
    if (!seedProduct) {
      res.status(404).json({ error: 'Seed product not found' });
      return;
    }

    // Check if the fertilizerId exists in the Product table
    const fertilizerProduct = await Product.findByPk(fertilizerProductId);
    if (!fertilizerProduct) {
      res.status(404).json({ error: 'Fertilizer product not found' });
      return;
    }
      const combination = await SeedFertilizer.create({ seedProductId, fertilizerProductId });
      res.status(201).json(combination);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create seed-fertilizer combination' });
    }
  }

  public async updateCombination(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { seedId, fertilizerId, description } = req.body;

    try {
      const combination = await SeedFertilizer.findByPk(id);
      if (combination) {
        combination.seedId = seedId;
        combination.fertilizerId = fertilizerId;
        combination.description = description;
        await combination.save();
        res.json(combination);
      } else {
        res.status(404).json({ error: 'Seed-fertilizer combination not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to update seed-fertilizer combination' });
    }
  }

  public async deleteCombination(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    try {
      const combination = await SeedFertilizer.findByPk(id);
      if (combination) {
        await combination.destroy();
        res.json({ message: 'Seed-fertilizer combination deleted successfully' });
      } else {
        res.status(404).json({ error: 'Seed-fertilizer combination not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete seed-fertilizer combination' });
    }
  }
}

export default new SeedFertilizerController();
