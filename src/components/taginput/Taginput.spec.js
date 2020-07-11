import { shallowMount } from '@vue/test-utils'
import BTaginput from '@components/taginput/Taginput'
import BTag from '@components/tag/Tag'

describe('BTaginput', () => {
    it('is called', () => {
        const wrapper = shallowMount(BTaginput)
        expect(wrapper.name()).toBe('BTaginput')
        expect(wrapper.isVueInstance()).toBeTruthy()
    })

    it('render correctly', () => {
        const wrapper = shallowMount(BTaginput)
        expect(wrapper.html()).toMatchSnapshot()
    })

    it('no display counter when hasCounter property set for false', () => {
        const wrapper = shallowMount(BTaginput, {
            propsData: { maxlength: 100 }
        })
        expect(wrapper.find('small.counter').exists()).toBeTruthy()

        wrapper.setProps({ hasCounter: false })
        expect(wrapper.find('small.counter').exists()).toBeFalsy()
    })

    it('should send close-type prop to BTag component properly', () => {
        const value = ['Test Value']
        const closeType = 'is-danger'
        const wrapper = shallowMount(BTaginput, {
            propsData: { value, closeType }
        })
        const Tag = wrapper.find(BTag)
        expect(Tag.attributes('closetype')).toBe(closeType)
    })

    it('should change type of BTag component with a callback prop', () => {
        const value = ['Bulma', 'Vue', 'Buefy']
        const type = (tag) => tag.startsWith('B') ? 'is-primary' : 'is-warning'
        const wrapper = shallowMount(BTaginput, {
            propsData: { value, type }
        })
        const tags = wrapper.findAll(BTag)
        expect(tags.at(0).attributes().type).toBe('is-primary')
        expect(tags.at(1).attributes().type).toBe('is-warning')
        expect(tags.at(2).attributes().type).toBe('is-primary')
    })
})
