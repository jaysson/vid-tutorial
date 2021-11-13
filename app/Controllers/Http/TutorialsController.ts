import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Tutorial from 'App/Models/Tutorial'

export default class TutorialsController {
  public index({ request }: HttpContextContract) {
    const teacherId = request.input('teacher_id')
    const topicIds = request.input('topic_ids')
    const searchQuery = request.input('query')
    return Tutorial.query()
      .preload('topic')
      .preload('teacher')
      .if(!!teacherId, (query) => query.where('teacher_id', teacherId))
      .if(!!topicIds, (query) => query.whereIn('topic_id', topicIds))
      .if(!!searchQuery, (query) => {
        query
          .where('title', 'LIKE', `%${searchQuery}%`)
          .orWhere('description', 'LIKE', `%${searchQuery}%`)
          .orWhereHas('teacher', (query) => {
            query
              .where('first_name', 'LIKE', `%${searchQuery}%`)
              .orWhere('last_name', 'LIKE', `%${searchQuery}%`)
          })
          .orWhereHas('topic', (query) => {
            query.where('name', 'LIKE', `%${searchQuery}%`)
          })
      })
      .paginate(request.input('page'), 25)
  }
}
