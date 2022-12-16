import request from 'supertest'
import { masterKey, apiRoot } from '../../config'
import express from '../../services/express'
import routes, { Brand } from '.'

const app = () => express(apiRoot, routes)

let brand

beforeEach(async () => {
  brand = await Brand.create({})
})

test('POST /brands 201 (master)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: masterKey, name: 'test', model: 'test', offer: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.name).toEqual('test')
  expect(body.model).toEqual('test')
  expect(body.offer).toEqual('test')
})

test('POST /brands 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /brands 200 (master)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: masterKey })
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /brands 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /brands/:id 200 (master)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${brand.id}`)
    .query({ access_token: masterKey })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(brand.id)
})

test('GET /brands/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${brand.id}`)
  expect(status).toBe(401)
})

test('GET /brands/:id 404 (master)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: masterKey })
  expect(status).toBe(404)
})

test('PUT /brands/:id 200 (master)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${brand.id}`)
    .send({ access_token: masterKey, name: 'test', model: 'test', offer: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(brand.id)
  expect(body.name).toEqual('test')
  expect(body.model).toEqual('test')
  expect(body.offer).toEqual('test')
})

test('PUT /brands/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${brand.id}`)
  expect(status).toBe(401)
})

test('PUT /brands/:id 404 (master)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: masterKey, name: 'test', model: 'test', offer: 'test' })
  expect(status).toBe(404)
})

test('DELETE /brands/:id 204 (master)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${brand.id}`)
    .query({ access_token: masterKey })
  expect(status).toBe(204)
})

test('DELETE /brands/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${brand.id}`)
  expect(status).toBe(401)
})

test('DELETE /brands/:id 404 (master)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: masterKey })
  expect(status).toBe(404)
})
