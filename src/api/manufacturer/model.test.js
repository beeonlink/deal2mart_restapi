import { Manufacturer } from '.'

let manufacturer

beforeEach(async () => {
  manufacturer = await Manufacturer.create({ name: 'test', model: 'test', offer: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = manufacturer.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(manufacturer.id)
    expect(view.name).toBe(manufacturer.name)
    expect(view.model).toBe(manufacturer.model)
    expect(view.offer).toBe(manufacturer.offer)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = manufacturer.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(manufacturer.id)
    expect(view.name).toBe(manufacturer.name)
    expect(view.model).toBe(manufacturer.model)
    expect(view.offer).toBe(manufacturer.offer)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
