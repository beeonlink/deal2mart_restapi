import request from 'supertest'
import { masterKey, apiRoot } from '../../config'
import express from '../../services/express'
import routes, { Permission } from '.'

const app = () => express(apiRoot, routes)

let permission

beforeEach(async () => {
  permission = await Permission.create({})
})

test('POST /permissions 201 (master)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: masterKey, status: 'test', allow: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.status).toEqual('test')
  expect(body.allow).toEqual('test')
})

test('POST /permissions 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /permissions 200 (master)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: masterKey })
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /permissions 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /permissions/:id 200 (master)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${permission.id}`)
    .query({ access_token: masterKey })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(permission.id)
})

test('GET /permissions/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${permission.id}`)
  expect(status).toBe(401)
})

test('GET /permissions/:id 404 (master)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: masterKey })
  expect(status).toBe(404)
})

test('PUT /permissions/:id 200 (master)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${permission.id}`)
    .send({ access_token: masterKey, status: 'test', allow: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(permission.id)
  expect(body.status).toEqual('test')
  expect(body.allow).toEqual('test')
})

test('PUT /permissions/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${permission.id}`)
  expect(status).toBe(401)
})

test('PUT /permissions/:id 404 (master)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: masterKey, status: 'test', allow: 'test' })
  expect(status).toBe(404)
})

test('DELETE /permissions/:id 204 (master)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${permission.id}`)
    .query({ access_token: masterKey })
  expect(status).toBe(204)
})

test('DELETE /permissions/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${permission.id}`)
  expect(status).toBe(401)
})

test('DELETE /permissions/:id 404 (master)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: masterKey })
  expect(status).toBe(404)
})
