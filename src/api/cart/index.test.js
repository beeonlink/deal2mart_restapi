import request from 'supertest'
import { masterKey, apiRoot } from '../../config'
import express from '../../services/express'
import routes, { Cart } from '.'

const app = () => express(apiRoot, routes)

let cart

beforeEach(async () => {
  cart = await Cart.create({})
})

test('POST /cart 201 (master)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: masterKey, user: 'test', product: 'test', qty: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.user).toEqual('test')
  expect(body.product).toEqual('test')
  expect(body.qty).toEqual('test')
})

test('POST /cart 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /cart 200 (master)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: masterKey })
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /cart 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /cart/:id 200 (master)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${cart.id}`)
    .query({ access_token: masterKey })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(cart.id)
})

test('GET /cart/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${cart.id}`)
  expect(status).toBe(401)
})

test('GET /cart/:id 404 (master)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: masterKey })
  expect(status).toBe(404)
})

test('PUT /cart/:id 200 (master)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${cart.id}`)
    .send({ access_token: masterKey, user: 'test', product: 'test', qty: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(cart.id)
  expect(body.user).toEqual('test')
  expect(body.product).toEqual('test')
  expect(body.qty).toEqual('test')
})

test('PUT /cart/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${cart.id}`)
  expect(status).toBe(401)
})

test('PUT /cart/:id 404 (master)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: masterKey, user: 'test', product: 'test', qty: 'test' })
  expect(status).toBe(404)
})

test('DELETE /cart/:id 204 (master)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${cart.id}`)
    .query({ access_token: masterKey })
  expect(status).toBe(204)
})

test('DELETE /cart/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${cart.id}`)
  expect(status).toBe(401)
})

test('DELETE /cart/:id 404 (master)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: masterKey })
  expect(status).toBe(404)
})
