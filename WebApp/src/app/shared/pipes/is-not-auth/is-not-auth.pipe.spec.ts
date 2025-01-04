import { IsNotAuthPipe } from './is-not-auth.pipe'

describe('IsNotAuthPipe', () => {
    it('create an instance', () => {
        const pipe = new IsNotAuthPipe()
        expect(pipe).toBeTruthy()
    })
})
