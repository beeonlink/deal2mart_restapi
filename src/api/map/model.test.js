import { Map } from '.'

let map

beforeEach(async () => {
  map = await Map.create({ name: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = map.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(map.id)
    expect(view.name).toBe(map.name)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = map.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(map.id)
    expect(view.name).toBe(map.name)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
