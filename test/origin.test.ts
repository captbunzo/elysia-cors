import { Elysia } from 'elysia'
import { cors } from '../src'

import { describe, expect, it } from 'bun:test'
import { req } from './utils'

describe('Origin', () => {
	it('Accept string', async () => {
		const app = new Elysia()
			.use(
				cors({
					origin: 'saltyaom.com'
				})
			)
			.get('/', () => 'A')

		const res = await app.fetch(
			new Request('http://localhost/', {
				headers: {
					origin: 'https://saltyaom.com'
				}
			})
		)

		expect(res.headers.get('Access-Control-Allow-Origin')).toBe(
			'https://saltyaom.com'
		)
	})

	it('Accept boolean', async () => {
		const app = new Elysia()
			.use(
				cors({
					origin: true
				})
			)
			.get('/', () => 'HI')

		const res = await app.handle(req('/'))
		expect(res.headers.get('Access-Control-Allow-Origin')).toBe('*')
	})

	it('Accept RegExp', async () => {
		const app = new Elysia()
			.use(
				cors({
					origin: /\.com/g
				})
			)
			.get('/', () => 'HI')

		const notAllowed = await app.handle(
			req('/', {
				Origin: 'https://example.org'
			})
		)
		const allowed = await app.handle(
			req('/', {
				Origin: 'https://example.com'
			})
		)
		expect(notAllowed.headers.get('Access-Control-Allow-Origin')).toBe(null)
		expect(allowed.headers.get('Access-Control-Allow-Origin')).toBe(
			'https://example.com'
		)
	})

	it('Accept Function', async () => {
		const app = new Elysia()
			.use(
				cors({
					origin: () => true
				})
			)
			.get('/', () => 'HI')

		const res = await app.handle(
			req('/', {
				Origin: 'https://example.com'
			})
		)
		expect(res.headers.get('Access-Control-Allow-Origin')).toBe(
			'https://example.com'
		)
	})

	it('Accept string[]', async () => {
		const app = new Elysia()
			.use(
				cors({
					origin: ['gehenna.sh', 'saltyaom.com']
				})
			)
			.get('/', () => 'A')

		const res = await app.fetch(
			new Request('http://localhost/', {
				headers: {
					origin: 'https://saltyaom.com'
				}
			})
		)

		expect(res.headers.get('Access-Control-Allow-Origin')).toBe(
			'https://saltyaom.com'
		)
	})

	it('Accept Function[]', async () => {
		const app = new Elysia()
			.use(
				cors({
					origin: ['https://demo.app', () => false, /.com/g]
				})
			)
			.get('/', () => 'HI')

		const res = await app.handle(
			req('/', {
				Origin: 'https://example.com'
			})
		)
		expect(res.headers.get('Access-Control-Allow-Origin')).toBe(
			'https://example.com'
		)
	})

	it('strictly check origin not using sub includes', async () => {
		const app = new Elysia()
			.use(
				cors({
					origin: 'example.com'
				})
			)
			.post('/', ({ body }) => body)

		const response = await app.handle(
			new Request('http://localhost/awd', {
				headers: {
					origin: 'http://notexample.com'
				}
			})
		)

		expect(response.headers.has('access-control-allow-origin')).toBeFalse()
	})
})
