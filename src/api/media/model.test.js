import { Media } from '.'

let media

beforeEach(async () => {
  media = await Media.create({ image: 'test', category: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = media.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(media.id)
    expect(view.image).toBe(media.image)
    expect(view.category).toBe(media.category)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = media.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(media.id)
    expect(view.image).toBe(media.image)
    expect(view.category).toBe(media.category)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
