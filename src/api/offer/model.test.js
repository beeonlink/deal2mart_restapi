import { Offer } from '.'

let offer

beforeEach(async () => {
  offer = await Offer.create({ title: 'test', image: 'test', price: 'test', status: 'test', shop: 'test', user: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = offer.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(offer.id)
    expect(view.title).toBe(offer.title)
    expect(view.image).toBe(offer.image)
    expect(view.price).toBe(offer.price)
    expect(view.status).toBe(offer.status)
    expect(view.shop).toBe(offer.shop)
    expect(view.user).toBe(offer.user)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = offer.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(offer.id)
    expect(view.title).toBe(offer.title)
    expect(view.image).toBe(offer.image)
    expect(view.price).toBe(offer.price)
    expect(view.status).toBe(offer.status)
    expect(view.shop).toBe(offer.shop)
    expect(view.user).toBe(offer.user)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
