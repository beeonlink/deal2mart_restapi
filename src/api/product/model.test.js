import { Product } from '.'

let product

beforeEach(async () => {
  product = await Product.create({ name: 'test', sku: 'test', category: 'test', brand: 'test', manufactuer: 'test', purchase_rate: 'test', retail_rate: 'test', qty: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = product.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(product.id)
    expect(view.name).toBe(product.name)
    expect(view.sku).toBe(product.sku)
    expect(view.category).toBe(product.category)
    expect(view.brand).toBe(product.brand)
    expect(view.manufactuer).toBe(product.manufactuer)
    expect(view.purchase_rate).toBe(product.purchase_rate)
    expect(view.retail_rate).toBe(product.retail_rate)
    expect(view.qty).toBe(product.qty)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = product.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(product.id)
    expect(view.name).toBe(product.name)
    expect(view.sku).toBe(product.sku)
    expect(view.category).toBe(product.category)
    expect(view.brand).toBe(product.brand)
    expect(view.manufactuer).toBe(product.manufactuer)
    expect(view.purchase_rate).toBe(product.purchase_rate)
    expect(view.retail_rate).toBe(product.retail_rate)
    expect(view.qty).toBe(product.qty)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
