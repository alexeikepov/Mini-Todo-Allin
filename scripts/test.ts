import { db } from './db_conn'

async function test() {
  const data = await db.schema.createTable('todos', table => {
    table.increments('id')
    table.text('text')
    table.boolean('completed').defaultTo(false)
    table.timestamp('createdAt').defaultTo(db.fn.now())
    table.timestamp('completedAt').defaultTo(db.fn.now())
  })
  console.log('data', data)

  console.log('done')
  db.destroy()
}

test()
