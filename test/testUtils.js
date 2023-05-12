import { act, render as testRender } from '@testing-library/react'
import React, { cloneElement } from 'react'
import { useRef } from 'react'
import { createRoot, findDOMNode } from 'react-dom/client'
import { isCompositeComponent } from 'react-dom/test-utils'

import { uuid } from '../src/utils/uuid'

// Record every container created for rendering
// Useful for doing a cleanup after each test case
// Ref: https://github.com/testing-library/react-testing-library/blob/main/src/pure.js
const mountedContainers = new Set()
const mountedRoots = new Set()

const reactVersion = +React.version

// FixMe: only for react18!
export function render(children) {
  const container = createTestContainer()
  if (reactVersion >= 18) {
    const root = createRoot(container)
    root.render(children)
    mountedRoots.add(root)
    return container
  }
}

/**
 * Check whether it is a DOM object?
 * @param node
 * @return {boolean}
 */
function isDOMElement(node) {
  return (
    node && typeof node === 'object' && node.nodeType === 1 && typeof node.nodeName === 'string'
  )
}

/**
 * @return {HTMLElement}
 */
export function getDOMNode(children) {
  if (isDOMElement(children)) {
    return children
  }

  if (isDOMElement(children.child)) {
    return children.child
  }

  if (isCompositeComponent(children)) {
    // eslint-disable-next-line react/no-find-dom-node
    return findDOMNode(children)
  }

  return getTestDOMNode(children)
}

export function getTestDOMNode(children) {
  const testId = uuid()
  const childTestId = uuid()
  const { getByTestId } = testRender(
    <div data-testid={testId}>{React.cloneElement(children, { 'data-testid': childTestId })}</div>
  )

  try {
    return getByTestId(testId).firstChild || getByTestId(childTestId)
  } catch (e) {
    return null
  }
}

export function getInstance(children, waitForDidMount = true) {
  const instanceRef = useRef()
  if (waitForDidMount) {
    act(() => {
      render(cloneElement(children, { ref: instanceRef }))
    })
  } else {
    render(cloneElement(children, { ref: instanceRef }))
  }

  return instanceRef.current
}

/**
 * @return {HTMLDivElement}
 */
export function createTestContainer() {
  const container = document.createElement('div')
  document.body.appendChild(container)

  // we'll add it to the mounted containers regardless of whether it's actually
  // added to document.body so the cleanup method works regardless of whether
  // they're passing us a custom container or not.
  mountedContainers.add(container)

  return container
}
