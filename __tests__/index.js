import forEach from 'callbag-for-each'
import fromIterable from 'callbag-from-iter'
import interval from 'callbag-interval'
import pipe from 'callbag-pipe'
import take from 'callbag-take'

import pairwise from '../src'

const deferred = () => {
  const def = {}

  def.promise = new Promise((resolve, reject) => {
    def.resolve = resolve
    def.reject = reject
  })

  return def
}

test('works with pullable source', () => {
  const actual = []

  pipe(
    fromIterable([1, 2, 3, 4, 5]),
    pairwise,
    forEach(data => actual.push(data)),
  )

  expect(actual).toEqual([[1, 2], [2, 3], [3, 4], [4, 5]])
})

test('works with listenable source', () => {
  const actual = []

  const def = deferred()

  pipe(
    interval(1),
    pairwise,
    take(5),
    forEach(data => {
      actual.push(data)

      if (actual.length === 5) {
        def.resolve()
      }
    }),
  )

  const started = Date.now()

  return def.promise.then(() => {
    expect(actual).toEqual([[0, 1], [1, 2], [2, 3], [3, 4], [4, 5]])
  })
})
