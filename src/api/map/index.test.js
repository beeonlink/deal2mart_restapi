import request from 'supertest'
import { masterKey, apiRoot } from '../../config'
import express from '../../services/express'
import routes, { Map } from '.'

const app = () => express(apiRoot, routes)

let map

beforeEach(async () => {
  map = await Map.create({})
})

test('POST /map 201 (master)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: masterKey, name: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.name).toEqual('test')
})

test('POST /map 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /map 200 (master)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: masterKey })
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /map 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /map/:id 200 (master)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${map.id}`)
    .query({ access_token: masterKey })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(map.id)
})

test('GET /map/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${map.id}`)
  expect(status).toBe(401)
})

test('GET /map/:id 404 (master)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: masterKey })
  expect(status).toBe(404)
})

test('PUT /map/:id 200 (master)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${map.id}`)
    .send({ access_token: masterKey, name: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(map.id)
  expect(body.name).toEqual('test')
})

test('PUT /map/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${map.id}`)
  expect(status).toBe(401)
})

test('PUT /map/:id 404 (master)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: masterKey, name: 'test' })
  expect(status).toBe(404)
})

test('DELETE /map/:id 204 (master)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${map.id}`)
    .query({ access_token: masterKey })
  expect(status).toBe(204)
})

test('DELETE /map/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${map.id}`)
  expect(status).toBe(401)
})

test('DELETE /map/:id 404 (master)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: masterKey })
  expect(status).toBe(404)
})
