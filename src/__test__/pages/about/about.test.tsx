import AboutPage from '@/pages/about'
import {render, screen} from '@testing-library/react'

describe('About Page', () => {
    it('render about page', () => {
        const page = render(<AboutPage />)
        // testing apakah isi konten dari elemen #about-title sama dengan “About”
        // toEqual() === toBe()
        expect(screen.getByTestId('about-title').textContent).toEqual('About')
        // testing apakah isi dari elemen page sama dengan snapshot saat ini
        expect(page).toMatchSnapshot()
    })
})