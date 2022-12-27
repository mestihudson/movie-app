import 'whatwg-fetch'

import '@testing-library/jest-dom';

import { server } from './tests/integration/mocks/server'

beforeAll(() => server.listen())

afterEach(() => server.resetHandlers())

afterAll(() => server.close())
