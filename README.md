# callbag-pairwise

Emits the previous and current values as an array

## Example

```js
import forEach from 'callbag-for-each'
import fromIterable from 'callbag-from-iter'
import pairwise from 'pairwise'
import pipe from 'callbag-pipe'

pipe(
  fromIterable([1, 2, 3, 4, 5]),
  pairwise,
  forEach(value => {
    // will log [1, 2], [2, 3], [3, 4], [4, 5]
    console.log(value)
  }),
)
```
