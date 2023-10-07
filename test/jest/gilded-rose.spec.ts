import { Item, GildedRose, ItemName, MAX_QUALITY, MIN_QUALITY, LEGENDARY_QUALITY } from '@/gilded-rose';

describe('Gilded Rose', () => {
  it('should foo', () => {
    const gildedRose = new GildedRose([new Item('foo', 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe('foo');
  });

  it('should decrease by 1 when sellin is not expired', () => {
    const gildedRose = new GildedRose([new Item('foo', 1, 1)]);
    const items = gildedRose.updateQuality();
    const item = items[0];
    expect(item.name).toBe('foo');
    expect(item.sellIn).toBe(0);
    expect(item.quality).toBe(0);
  });

  it('should decrease by 2 when sellin is expired', () => {
    const gildedRose = new GildedRose([new Item('foo', 0, 2)]);
    const items = gildedRose.updateQuality();
    const item = items[0];
    expect(item.name).toBe('foo');
    expect(item.sellIn).toBe(-1);
    expect(item.quality).toBe(0);
  });

  it(`should never go below ${MIN_QUALITY}`, () => {
    const gildedRose = new GildedRose([new Item('foo', 0, 0)]);
    const items = gildedRose.updateQuality();
    const item = items[0];
    expect(item.name).toBe('foo');
    expect(item.sellIn).toBe(-1);
    expect(item.quality).toBe(MIN_QUALITY);
  });
});

describe('Aged brie', () => {
  it('should increase quality', () => {
    const gildedRose = new GildedRose([new Item(ItemName.AGED_BRIE, 1, 49)]);
    const items = gildedRose.updateQuality();
    const item = items[0];
    expect(item.name).toBe(ItemName.AGED_BRIE);
    expect(item.sellIn).toBe(0);
    expect(item.quality).toBe(50);
  });

  it(`should never go above ${MAX_QUALITY}`, () => {
    const gildedRose = new GildedRose([new Item(ItemName.AGED_BRIE, 1, MAX_QUALITY)]);
    const items = gildedRose.updateQuality();
    const item = items[0];
    expect(item.name).toBe(ItemName.AGED_BRIE);
    expect(item.sellIn).toBe(0);
    expect(item.quality).toBe(MAX_QUALITY);
  });
})

describe('Sulfuras', () => {
  it(`should be ${LEGENDARY_QUALITY}`, () => {
    const gildedRose = new GildedRose([new Item(ItemName.SULFURAS, 1, 1)]);
    const items = gildedRose.updateQuality();
    const item = items[0];
    expect(item.name).toBe(ItemName.SULFURAS);
    expect(item.sellIn).toBe(1);
    expect(item.quality).toBe(LEGENDARY_QUALITY);
  });
})

describe('Backstage passes', () => {
  it('should increase by 1 when more than 10 days', () => {
    const gildedRose = new GildedRose([new Item(ItemName.BACKSTAGE_PASSES, 11, 1)]);
    const items = gildedRose.updateQuality();
    const item = items[0];
    expect(item.name).toBe(ItemName.BACKSTAGE_PASSES);
    expect(item.sellIn).toBe(10);
    expect(item.quality).toBe(2);
  });

  it('should increases by 2 when there are 10 days or less', () => {
    const gildedRose = new GildedRose([new Item(ItemName.BACKSTAGE_PASSES, 6, 1)]);
    const items = gildedRose.updateQuality();
    const item = items[0];
    expect(item.name).toBe(ItemName.BACKSTAGE_PASSES);
    expect(item.sellIn).toBe(5);
    expect(item.quality).toBe(3);
  });

  it('should increase by 3 when there are 5 days or less', () => {
    const gildedRose = new GildedRose([new Item(ItemName.BACKSTAGE_PASSES, 5, 1)]);
    const items = gildedRose.updateQuality();
    const item = items[0];
    expect(item.name).toBe(ItemName.BACKSTAGE_PASSES);
    expect(item.sellIn).toBe(4);
    expect(item.quality).toBe(4);
  });

  it('should be 0 after concert', () => {
    const gildedRose = new GildedRose([new Item(ItemName.BACKSTAGE_PASSES, 0, 1)]);
    const items = gildedRose.updateQuality();
    const item = items[0];
    expect(item.name).toBe(ItemName.BACKSTAGE_PASSES);
    expect(item.sellIn).toBe(-1);
    expect(item.quality).toBe(0);
  });

  it(`should never go above ${MAX_QUALITY}`, () => {
    const gildedRose = new GildedRose([new Item(ItemName.BACKSTAGE_PASSES, 1, MAX_QUALITY)]);
    const items = gildedRose.updateQuality();
    const item = items[0];
    expect(item.name).toBe(ItemName.BACKSTAGE_PASSES);
    expect(item.sellIn).toBe(0);
    expect(item.quality).toBe(MAX_QUALITY);
  });
})

describe('Conjured', () => {
  it('should decrease by 2 when sellin is not expired', () => {
    const gildedRose = new GildedRose([new Item(ItemName.CONJURED, 1, 5)]);
    const items = gildedRose.updateQuality();
    const item = items[0];
    expect(item.name).toBe(ItemName.CONJURED);
    expect(item.sellIn).toBe(0);
    expect(item.quality).toBe(3);
  });

  it('should decrease by 4 when sellin is expired', () => {
    const gildedRose = new GildedRose([new Item(ItemName.CONJURED, 0, 5)]);
    const items = gildedRose.updateQuality();
    const item = items[0];
    expect(item.name).toBe(ItemName.CONJURED);
    expect(item.sellIn).toBe(-1);
    expect(item.quality).toBe(1);
  });

  it(`should never go below ${MIN_QUALITY}`, () => {
    const gildedRose = new GildedRose([new Item(ItemName.CONJURED, 0, 1)]);
    const items = gildedRose.updateQuality();
    const item = items[0];
    expect(item.name).toBe(ItemName.CONJURED);
    expect(item.sellIn).toBe(-1);
    expect(item.quality).toBe(MIN_QUALITY);
  });
})
