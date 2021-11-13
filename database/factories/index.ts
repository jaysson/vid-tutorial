import Factory from '@ioc:Adonis/Lucid/Factory'
import Teacher from 'App/Models/Teacher'
import Tutorial from 'App/Models/Tutorial'
import Topic from 'App/Models/Topic'

export const TopicFactory = Factory.define(Topic, ({ faker }) => {
  return {
    name: faker.lorem.word(),
  }
}).build()

export const TeacherFactory = Factory.define(Teacher, ({ faker }) => {
  return {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
  }
}).build()

export const TutorialFactory = Factory.define(Tutorial, ({ faker }) => {
  return {
    title: faker.lorem.sentence(),
    description: faker.lorem.paragraphs(2, '\n\n'),
    thumbnail: faker.image.imageUrl(128, 128),
    embedUrl: 'https://www.youtube.com/embed/eKY-QES1XQQ',
  }
})
  .relation('topic', () => TopicFactory)
  .relation('teacher', () => TeacherFactory)
  .build()
