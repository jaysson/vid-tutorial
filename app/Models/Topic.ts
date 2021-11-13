import { DateTime } from 'luxon'
import { BaseModel, column, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Tutorial from 'App/Models/Tutorial'
import CamelCaseNamingStrategy from 'App/Strategies/CamelCaseNamingStrategy'

export default class Topic extends BaseModel {
  public static namingStrategy = new CamelCaseNamingStrategy()

  @column({ isPrimary: true })
  public id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column()
  public name: string

  @manyToMany(() => Tutorial)
  public tutorials: ManyToMany<typeof Tutorial>
}
