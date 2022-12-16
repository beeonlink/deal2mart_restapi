import { Combo } from '.'

let combo

beforeEach(async () => {
  combo = await Combo.create({ title: 'test', image: 'test', price: 'test', status: 'test', shop: 'test', user: 'test', products: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = combo.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(combo.id)
    expect(view.title).toBe(combo.title)
    expect(view.image).toBe(combo.image)
    expect(view.price).toBe(combo.price)
    expect(view.status).toBe(combo.status)
    expect(view.shop).toBe(combo.shop)
    expect(view.user).toBe(combo.user)
    expect(view.products).toBe(combo.products)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = combo.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(combo.id)
    expect(view.title).toBe(combo.title)
    expect(view.image).toBe(combo.image)
    expect(view.price).toBe(combo.price)
    expect(view.status).toBe(combo.status)
    expect(view.shop).toBe(combo.shop)
    expect(view.user).toBe(combo.user)
    expect(view.products).toBe(combo.products)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
