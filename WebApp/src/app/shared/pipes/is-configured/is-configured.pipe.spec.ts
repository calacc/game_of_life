import { IsConfiguredPipe } from './is-configured.pipe'

describe('IsConfiguredPipe', () => {
    it('create an instance', () => {
        const pipe = new IsConfiguredPipe()
        expect(pipe).toBeTruthy()
    })
})
