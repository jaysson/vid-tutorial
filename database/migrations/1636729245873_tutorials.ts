import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Tutorials extends BaseSchema {
  protected tableName = 'tutorials'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('title')
      table.text('description')
      table.string('embed_url')
      table.string('thumbnail')
      table.integer('teacher_id').unsigned().references('id').inTable('teachers').onDelete('cascade')
      table.integer('topic_id').unsigned().references('id').inTable('teachers').onDelete('cascade')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
