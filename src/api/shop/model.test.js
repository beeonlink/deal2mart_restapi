import { Shop } from '.'

let shop

beforeEach(async () => {
  shop = await Shop.create({ name: 'test', phone: 'test', email: 'test', description: 'test', street: 'test', city: 'test', state: 'test', country: 'test', pincode: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = shop.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(shop.id)
    expect(view.name).toBe(shop.name)
    expect(view.phone).toBe(shop.phone)
    expect(view.email).toBe(shop.email)
    expect(view.description).toBe(shop.description)
    expect(view.street).toBe(shop.street)
    expect(view.city).toBe(shop.city)
    expect(view.state).toBe(shop.state)
    expect(view.country).toBe(shop.country)
    expect(view.pincode).toBe(shop.pincode)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = shop.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(shop.id)
    expect(view.name).toBe(shop.name)
    expect(view.phone).toBe(shop.phone)
    expect(view.email).toBe(shop.email)
    expect(view.description).toBe(shop.description)
    expect(view.street).toBe(shop.street)
    expect(view.city).toBe(shop.city)
    expect(view.state).toBe(shop.state)
    expect(view.country).toBe(shop.country)
    expect(view.pincode).toBe(shop.pincode)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
