import request from 'supertest'
import { masterKey, apiRoot } from '../../config'
import express from '../../services/express'
import routes, { Manufacturer } from '.'

const app = () => express(apiRoot, routes)

let manufacturer

beforeEach(async () => {
  manufacturer = await Manufacturer.create({})
})

test('POST /manufacturers 201 (master)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: masterKey, name: 'test', model: 'test', offer: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.name).toEqual('test')
  expect(body.model).toEqual('test')
  expect(body.offer).toEqual('test')
})

test('POST /manufacturers 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /manufacturers 200 (master)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: masterKey })
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /manufacturers 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /manufacturers/:id 200 (master)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${manufacturer.id}`)
    .query({ access_token: masterKey })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(manufacturer.id)
})

test('GET /manufacturers/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${manufacturer.id}`)
  expect(status).toBe(401)
})

test('GET /manufacturers/:id 404 (master)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: masterKey })
  expect(status).toBe(404)
})

test('PUT /manufacturers/:id 200 (master)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${manufacturer.id}`)
    .send({ access_token: masterKey, name: 'test', model: 'test', offer: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(manufacturer.id)
  expect(body.name).toEqual('test')
  expect(body.model).toEqual('test')
  expect(body.offer).toEqual('test')
})

test('PUT /manufacturers/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${manufacturer.id}`)
  expect(status).toBe(401)
})

test('PUT /manufacturers/:id 404 (master)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: masterKey, name: 'test', model: 'test', offer: 'test' })
  expect(status).toBe(404)
})

test('DELETE /manufacturers/:id 204 (master)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${manufacturer.id}`)
    .query({ access_token: masterKey })
  expect(status).toBe(204)
})

test('DELETE /manufacturers/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${manufacturer.id}`)
  expect(status).toBe(401)
})

test('DELETE /manufacturers/:id 404 (master)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: masterKey })
  expect(status).toBe(404)
})
