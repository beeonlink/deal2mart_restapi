import request from 'supertest'
import { masterKey, apiRoot } from '../../config'
import express from '../../services/express'
import routes, { Offer } from '.'

const app = () => express(apiRoot, routes)

let offer

beforeEach(async () => {
  offer = await Offer.create({})
})

test('POST /offers 201 (master)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: masterKey, title: 'test', image: 'test', price: 'test', status: 'test', shop: 'test', user: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.title).toEqual('test')
  expect(body.image).toEqual('test')
  expect(body.price).toEqual('test')
  expect(body.status).toEqual('test')
  expect(body.shop).toEqual('test')
  expect(body.user).toEqual('test')
})

test('POST /offers 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /offers 200 (master)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: masterKey })
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /offers 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /offers/:id 200 (master)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${offer.id}`)
    .query({ access_token: masterKey })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(offer.id)
})

test('GET /offers/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${offer.id}`)
  expect(status).toBe(401)
})

test('GET /offers/:id 404 (master)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: masterKey })
  expect(status).toBe(404)
})

test('PUT /offers/:id 200 (master)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${offer.id}`)
    .send({ access_token: masterKey, title: 'test', image: 'test', price: 'test', status: 'test', shop: 'test', user: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(offer.id)
  expect(body.title).toEqual('test')
  expect(body.image).toEqual('test')
  expect(body.price).toEqual('test')
  expect(body.status).toEqual('test')
  expect(body.shop).toEqual('test')
  expect(body.user).toEqual('test')
})

test('PUT /offers/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${offer.id}`)
  expect(status).toBe(401)
})

test('PUT /offers/:id 404 (master)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: masterKey, title: 'test', image: 'test', price: 'test', status: 'test', shop: 'test', user: 'test' })
  expect(status).toBe(404)
})

test('DELETE /offers/:id 204 (master)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${offer.id}`)
    .query({ access_token: masterKey })
  expect(status).toBe(204)
})

test('DELETE /offers/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${offer.id}`)
  expect(status).toBe(401)
})

test('DELETE /offers/:id 404 (master)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: masterKey })
  expect(status).toBe(404)
})
