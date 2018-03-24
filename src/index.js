export default function pairwise(source) {
  return (start, sink) => {
    if (start !== 0) return
    let inited = 0
    let prev
    let current
    let talkback
    source(0, (type, data) => {
      if (type === 0) {
        talkback = data
      }

      if (type !== 1) {
        sink(type, data)
        return
      }

      ;[prev, current] = [current, data]

      inited++

      if (inited < 2) {
        talkback(1)
        return
      }

      sink(1, [prev, current])
    })
  }
}
