export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export enum ItemName {
  AGED_BRIE = 'Aged Brie',
  BACKSTAGE_PASSES = 'Backstage passes to a TAFKAL80ETC concert',
  SULFURAS = 'Sulfuras, Hand of Ragnaros',
  CONJURED = 'Conjured',
}

export const MIN_QUALITY = 0;
export const MAX_QUALITY = 50;
export const LEGENDARY_QUALITY = 80;

export class GildedRose {
  items: Array<Item>;

  constructor(items: Array<Item> = []) {
    this.items = items;
  }

  private isLegendaryItem(name: string): boolean {
    return name === ItemName.SULFURAS;
  }

  private isSellInExpired(sellIn: number): boolean {
    return sellIn < 1;
  }

  private decreaseSellIn(item: Item) {
    if (!this.isLegendaryItem(item.name)) {
      item.sellIn--;
    }
  }

  private increaseQuality(item: Item) {
    if (item.quality < MAX_QUALITY) {
      item.quality++;
    } else {
      item.quality = MAX_QUALITY;
    }
  }

  private decreaseQuality(item: Item, amount: number = 1) {
    if (item.quality - amount > MIN_QUALITY) {
      item.quality -= amount;
    } else {
      item.quality = MIN_QUALITY;
    }
  }

  private updateQualityForDefaultItem(item: Item) {
    this.decreaseQuality(item);
    this.isSellInExpired(item.sellIn) && this.decreaseQuality(item);
  }

  private updateQualityForAgedBrieItem(item: Item) {
    this.increaseQuality(item);
  }

  private updateQualityForBackstagePassesItem(item: Item) {
    if (!this.isSellInExpired(item.sellIn)) {
      this.increaseQuality(item);
      item.sellIn < 11 && this.increaseQuality(item);
      item.sellIn < 6 && this.increaseQuality(item);
    } else {
      item.quality = 0;
    }
  }

  private updateQualityForSulfurasItem(item: Item) {
    item.quality = LEGENDARY_QUALITY;
  }

  private updateQualityForConjuredItem(item: Item) {
    this.decreaseQuality(item, 2);
    this.isSellInExpired(item.sellIn) && this.decreaseQuality(item, 2);
  }

  private updateQualityForItem(item: Item) {
    switch (item.name) {
      case ItemName.AGED_BRIE:
        this.updateQualityForAgedBrieItem(item);
        break;
      case ItemName.BACKSTAGE_PASSES:
        this.updateQualityForBackstagePassesItem(item);
        break;
      case ItemName.SULFURAS:
        this.updateQualityForSulfurasItem(item);
        break;
      case ItemName.CONJURED:
        this.updateQualityForConjuredItem(item);
        break;
      default:
        this.updateQualityForDefaultItem(item);
    }
  }

  updateQuality(): Array<Item> {
    return this.items.map((item: Item) => {
      this.updateQualityForItem(item);
      this.decreaseSellIn(item);
      return item;
    });
  }
}
