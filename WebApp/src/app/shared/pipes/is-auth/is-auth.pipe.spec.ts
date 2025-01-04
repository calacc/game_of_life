import { IsAuthPipe } from './is-auth.pipe'

describe('IsAuthPipe', () => {
    it('create an instance', () => {
        const pipe = new IsAuthPipe()
        expect(pipe).toBeTruthy()
    })
})
