import request from 'supertest'
import { masterKey, apiRoot } from '../../config'
import express from '../../services/express'
import routes, { Shop } from '.'

const app = () => express(apiRoot, routes)

let shop

beforeEach(async () => {
  shop = await Shop.create({})
})

test('POST /shops 201 (master)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: masterKey, name: 'test', phone: 'test', email: 'test', description: 'test', street: 'test', city: 'test', state: 'test', country: 'test', pincode: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.name).toEqual('test')
  expect(body.phone).toEqual('test')
  expect(body.email).toEqual('test')
  expect(body.description).toEqual('test')
  expect(body.street).toEqual('test')
  expect(body.city).toEqual('test')
  expect(body.state).toEqual('test')
  expect(body.country).toEqual('test')
  expect(body.pincode).toEqual('test')
})

test('POST /shops 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /shops 200 (master)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: masterKey })
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /shops 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /shops/:id 200 (master)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${shop.id}`)
    .query({ access_token: masterKey })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(shop.id)
})

test('GET /shops/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${shop.id}`)
  expect(status).toBe(401)
})

test('GET /shops/:id 404 (master)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: masterKey })
  expect(status).toBe(404)
})

test('PUT /shops/:id 200 (master)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${shop.id}`)
    .send({ access_token: masterKey, name: 'test', phone: 'test', email: 'test', description: 'test', street: 'test', city: 'test', state: 'test', country: 'test', pincode: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(shop.id)
  expect(body.name).toEqual('test')
  expect(body.phone).toEqual('test')
  expect(body.email).toEqual('test')
  expect(body.description).toEqual('test')
  expect(body.street).toEqual('test')
  expect(body.city).toEqual('test')
  expect(body.state).toEqual('test')
  expect(body.country).toEqual('test')
  expect(body.pincode).toEqual('test')
})

test('PUT /shops/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${shop.id}`)
  expect(status).toBe(401)
})

test('PUT /shops/:id 404 (master)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: masterKey, name: 'test', phone: 'test', email: 'test', description: 'test', street: 'test', city: 'test', state: 'test', country: 'test', pincode: 'test' })
  expect(status).toBe(404)
})

test('DELETE /shops/:id 204 (master)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${shop.id}`)
    .query({ access_token: masterKey })
  expect(status).toBe(204)
})

test('DELETE /shops/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${shop.id}`)
  expect(status).toBe(401)
})

test('DELETE /shops/:id 404 (master)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: masterKey })
  expect(status).toBe(404)
})
