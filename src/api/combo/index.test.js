import request from 'supertest'
import { masterKey, apiRoot } from '../../config'
import express from '../../services/express'
import routes, { Combo } from '.'

const app = () => express(apiRoot, routes)

let combo

beforeEach(async () => {
  combo = await Combo.create({})
})

test('POST /combos 201 (master)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: masterKey, title: 'test', image: 'test', price: 'test', status: 'test', shop: 'test', user: 'test', products: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.title).toEqual('test')
  expect(body.image).toEqual('test')
  expect(body.price).toEqual('test')
  expect(body.status).toEqual('test')
  expect(body.shop).toEqual('test')
  expect(body.user).toEqual('test')
  expect(body.products).toEqual('test')
})

test('POST /combos 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /combos 200 (master)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: masterKey })
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /combos 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /combos/:id 200 (master)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${combo.id}`)
    .query({ access_token: masterKey })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(combo.id)
})

test('GET /combos/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${combo.id}`)
  expect(status).toBe(401)
})

test('GET /combos/:id 404 (master)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: masterKey })
  expect(status).toBe(404)
})

test('PUT /combos/:id 200 (master)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${combo.id}`)
    .send({ access_token: masterKey, title: 'test', image: 'test', price: 'test', status: 'test', shop: 'test', user: 'test', products: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(combo.id)
  expect(body.title).toEqual('test')
  expect(body.image).toEqual('test')
  expect(body.price).toEqual('test')
  expect(body.status).toEqual('test')
  expect(body.shop).toEqual('test')
  expect(body.user).toEqual('test')
  expect(body.products).toEqual('test')
})

test('PUT /combos/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${combo.id}`)
  expect(status).toBe(401)
})

test('PUT /combos/:id 404 (master)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: masterKey, title: 'test', image: 'test', price: 'test', status: 'test', shop: 'test', user: 'test', products: 'test' })
  expect(status).toBe(404)
})

test('DELETE /combos/:id 204 (master)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${combo.id}`)
    .query({ access_token: masterKey })
  expect(status).toBe(204)
})

test('DELETE /combos/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${combo.id}`)
  expect(status).toBe(401)
})

test('DELETE /combos/:id 404 (master)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: masterKey })
  expect(status).toBe(404)
})
