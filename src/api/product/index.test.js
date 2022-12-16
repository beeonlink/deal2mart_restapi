import request from 'supertest'
import { masterKey, apiRoot } from '../../config'
import express from '../../services/express'
import routes, { Product } from '.'

const app = () => express(apiRoot, routes)

let product

beforeEach(async () => {
  product = await Product.create({})
})

test('POST /products 201 (master)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: masterKey, name: 'test', sku: 'test', category: 'test', brand: 'test', manufactuer: 'test', purchase_rate: 'test', retail_rate: 'test', qty: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.name).toEqual('test')
  expect(body.sku).toEqual('test')
  expect(body.category).toEqual('test')
  expect(body.brand).toEqual('test')
  expect(body.manufactuer).toEqual('test')
  expect(body.purchase_rate).toEqual('test')
  expect(body.retail_rate).toEqual('test')
  expect(body.qty).toEqual('test')
})

test('POST /products 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /products 200 (master)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: masterKey })
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /products 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /products/:id 200 (master)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${product.id}`)
    .query({ access_token: masterKey })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(product.id)
})

test('GET /products/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${product.id}`)
  expect(status).toBe(401)
})

test('GET /products/:id 404 (master)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: masterKey })
  expect(status).toBe(404)
})

test('PUT /products/:id 200 (master)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${product.id}`)
    .send({ access_token: masterKey, name: 'test', sku: 'test', category: 'test', brand: 'test', manufactuer: 'test', purchase_rate: 'test', retail_rate: 'test', qty: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(product.id)
  expect(body.name).toEqual('test')
  expect(body.sku).toEqual('test')
  expect(body.category).toEqual('test')
  expect(body.brand).toEqual('test')
  expect(body.manufactuer).toEqual('test')
  expect(body.purchase_rate).toEqual('test')
  expect(body.retail_rate).toEqual('test')
  expect(body.qty).toEqual('test')
})

test('PUT /products/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${product.id}`)
  expect(status).toBe(401)
})

test('PUT /products/:id 404 (master)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: masterKey, name: 'test', sku: 'test', category: 'test', brand: 'test', manufactuer: 'test', purchase_rate: 'test', retail_rate: 'test', qty: 'test' })
  expect(status).toBe(404)
})

test('DELETE /products/:id 204 (master)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${product.id}`)
    .query({ access_token: masterKey })
  expect(status).toBe(204)
})

test('DELETE /products/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${product.id}`)
  expect(status).toBe(401)
})

test('DELETE /products/:id 404 (master)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: masterKey })
  expect(status).toBe(404)
})
