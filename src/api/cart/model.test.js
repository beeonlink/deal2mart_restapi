import { Cart } from '.'

let cart

beforeEach(async () => {
  cart = await Cart.create({ user: 'test', product: 'test', qty: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = cart.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(cart.id)
    expect(view.user).toBe(cart.user)
    expect(view.product).toBe(cart.product)
    expect(view.qty).toBe(cart.qty)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = cart.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(cart.id)
    expect(view.user).toBe(cart.user)
    expect(view.product).toBe(cart.product)
    expect(view.qty).toBe(cart.qty)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
