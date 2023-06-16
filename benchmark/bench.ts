import b from 'benny'

import { plus100 } from '../index'

function add(start: number, end: number) {
  let rt = 0
  for (let index = start; index < end; index++) {
    rt += index
  }
  return rt
}

async function run() {
  const start = 0
  const end = 500

  await b.suite(
    `Add ${start}-${end}`,
    b.add('Native', () => {
      plus100(start, end)
    }),

    b.add('JavaScript', () => {
      add(start, end)
    }),

    b.cycle(),
    b.complete(),
    b.save({ file: 'add-test', format: 'chart.html' }),
  )
}

run().catch((e) => {
  console.error(e)
})
