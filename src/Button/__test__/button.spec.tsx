// import { testStandardProps } from '@test/commonCases'
// import { getDOMNode, getInstance } from '@test/testUtils'
import { render, screen } from '@testing-library/react'
import { assert } from 'chai'
import React from 'react'

// import ReactTestUtils from 'react-dom/test-utils'
// import sinon from 'sinon'
import Button from '../Button'

describe('Button', () => {
  it('Should output a button', () => {
    const { container } = render(<Button>Button</Button>)
    // const instance = getDOMNode(<Button>Title</Button>)
    assert.equal(container.textContent, 'not loading-Button')
  })
})
