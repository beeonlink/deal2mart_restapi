import request from 'supertest'
import { masterKey, apiRoot } from '../../config'
import express from '../../services/express'
import routes, { Media } from '.'

const app = () => express(apiRoot, routes)

let media

beforeEach(async () => {
  media = await Media.create({})
})

test('POST /media 201 (master)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: masterKey, image: 'test', category: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.image).toEqual('test')
  expect(body.category).toEqual('test')
})

test('POST /media 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /media 200 (master)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: masterKey })
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /media 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /media/:id 200 (master)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${media.id}`)
    .query({ access_token: masterKey })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(media.id)
})

test('GET /media/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${media.id}`)
  expect(status).toBe(401)
})

test('GET /media/:id 404 (master)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: masterKey })
  expect(status).toBe(404)
})

test('PUT /media/:id 200 (master)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${media.id}`)
    .send({ access_token: masterKey, image: 'test', category: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(media.id)
  expect(body.image).toEqual('test')
  expect(body.category).toEqual('test')
})

test('PUT /media/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${media.id}`)
  expect(status).toBe(401)
})

test('PUT /media/:id 404 (master)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: masterKey, image: 'test', category: 'test' })
  expect(status).toBe(404)
})

test('DELETE /media/:id 204 (master)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${media.id}`)
    .query({ access_token: masterKey })
  expect(status).toBe(204)
})

test('DELETE /media/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${media.id}`)
  expect(status).toBe(401)
})

test('DELETE /media/:id 404 (master)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: masterKey })
  expect(status).toBe(404)
})
