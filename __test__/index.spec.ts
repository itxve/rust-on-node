import test from 'ava'

import { asyncPlus100, asyncFib, updateAgdvt } from '../index'

test('[Plus 100 sleep]: from native', async (t) => {
  const content = await asyncPlus100(Promise.resolve(10))
  t.is(content, 110)
})

test('[AsyncFib]', async (t) => {
  const content = await asyncFib(12)
  t.is(content, 13)
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
