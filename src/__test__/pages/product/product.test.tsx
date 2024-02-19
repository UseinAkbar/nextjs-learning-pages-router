import ProductPageSWR from '@/pages/product/swr'
import {render, screen} from '@testing-library/react'

jest.mock('next/router', () => {
    return {
        useRouter() {
            return {
                route: '/product',
                pathname: '',
                query: {},
                asPath: '/',
                push: jest.fn(),
                events: {
                    on: jest.fn(),
                    off: jest.fn(),
                },
                beforePopState: jest.fn(() => null),
                prefetch: jest.fn(() => null),
                isReady: true
            }
        }
    }
})

describe('Product Page', () => {
    it('render product page', () => {
        const page = render(<ProductPageSWR />)
        expect(screen.getByTestId('product-title').textContent).toEqual('Product')
        expect(page).toMatchSnapshot()
    })
})