import { Brand } from '.'

let brand

beforeEach(async () => {
  brand = await Brand.create({ name: 'test', model: 'test', offer: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = brand.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(brand.id)
    expect(view.name).toBe(brand.name)
    expect(view.model).toBe(brand.model)
    expect(view.offer).toBe(brand.offer)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = brand.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(brand.id)
    expect(view.name).toBe(brand.name)
    expect(view.model).toBe(brand.model)
    expect(view.offer).toBe(brand.offer)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
