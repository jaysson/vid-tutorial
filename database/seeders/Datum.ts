import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { TeacherFactory, TopicFactory, TutorialFactory } from 'Database/factories'
import Tutorial from 'App/Models/Tutorial'
import Topic from 'App/Models/Topic'
import Teacher from 'App/Models/Teacher'

export default class DatumSeeder extends BaseSeeder {
  public async run() {
    Tutorial.query().delete()
    Topic.query().delete()
    Teacher.query().delete()

    const topics = await TopicFactory.createMany(25)
    const teachers = await TeacherFactory.createMany(100)

    await TutorialFactory.createMany(100, async (tutorial, { faker }) => {
      tutorial.teacherId = faker.random.arrayElements(teachers)[0].id
      tutorial.topicId = faker.random.arrayElements(topics)[0].id
    })
  }
}
