import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Topic from 'App/Models/Topic'
import Teacher from 'App/Models/Teacher'

export default class Tutorial extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column()
  public title: string

  @column()
  public embedUrl: string

  @column()
  public thumbnail: string

  @column()
  public description: string

  @column()
  public teacherId: number

  @column()
  public topicId: number

  @belongsTo(() => Topic)
  public topic: BelongsTo<typeof Topic>

  @belongsTo(() => Teacher)
  public teacher: BelongsTo<typeof Teacher>
}
