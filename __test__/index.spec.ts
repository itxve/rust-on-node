import test from 'ava'

import { asyncPlus100, asyncFib, updateAgdvt } from '../index'

test('[Plus 100 sleep]: from native', async (t) => {
  asyncPlus100(Promise.resolve(10)).then((content) => {
    t.is(content, 110)
  })
})

test('[AsyncFib]', (t) => {
  asyncFib(12).then((content) => {
    t.is(content, 13)
  })
})

test('[UpdateAgdvt]', (t) => {
  const content = updateAgdvt(
    {
      sgt: '23',
    },
    '100',
  )
  t.assert(content.sgt, '100')
})
