import { Permission } from '.'

let permission

beforeEach(async () => {
  permission = await Permission.create({ status: 'test', allow: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = permission.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(permission.id)
    expect(view.status).toBe(permission.status)
    expect(view.allow).toBe(permission.allow)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = permission.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(permission.id)
    expect(view.status).toBe(permission.status)
    expect(view.allow).toBe(permission.allow)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
