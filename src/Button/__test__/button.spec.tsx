// import { testStandardProps } from '@test/commonCases'
import { getDOMNode } from '@test/testUtils'
import { assert } from 'chai'
import React from 'react'

// import ReactTestUtils from 'react-dom/test-utils'
// import sinon from 'sinon'
import Button from '../Button'

describe('Button', () => {
  it('Should output a button', () => {
    const instance = getDOMNode(<Button>Loading</Button>)
    assert.equal(instance.textContent, 'Loading')
  })
})
