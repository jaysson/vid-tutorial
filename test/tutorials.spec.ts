import test from 'japa'
import { TutorialFactory } from 'Database/factories'
import supertest from 'supertest'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}/api/`

test.group('Tutorials', () => {
  test('stored video is part of search response', async (assert) => {
    const tutorial = await TutorialFactory.create()
    const { text } = await supertest(BASE_URL).get('tutorials').expect(200)
    assert.include(text, tutorial.title)
    assert.include(text, tutorial.embedUrl)
  })

  test('stored video is not part of response when it does not match the title', async (assert) => {
    const tutorial = await TutorialFactory.create()
    const { text } = await supertest(BASE_URL).get(`tutorials?query=${tutorial.title}invalid`)
    assert.notInclude(text, tutorial.title)
  })

  test('stored video is not part of response when it does not match the description', async (assert) => {
    const tutorial = await TutorialFactory.create()
    const { text } = await supertest(BASE_URL).get(`tutorials?query=${tutorial.title}invalid`)
    assert.notInclude(text, tutorial.description)
  })

  test('only 25 videos are returned at once', async (assert) => {
    await TutorialFactory.createMany(100)
    const { text } = await supertest(BASE_URL).get(`tutorials`)
    const response = JSON.parse(text)
    assert.equal(response.data.length, 25)
  })

  test('right page is returned for the given page param', async (assert) => {
    await TutorialFactory.createMany(100)
    const { text } = await supertest(BASE_URL).get(`tutorials?page=3`)
    const response = JSON.parse(text)
    assert.equal(response.meta.currentPage, 3)
  })

  test('tutorial can be fetched by id', async (assert) => {
    const tutorial = await TutorialFactory.create()
    const { text } = await supertest(BASE_URL).get(`tutorials/${tutorial.id}`)
    const response = JSON.parse(text)
    assert.equal(response.title, tutorial.title)
    assert.equal(response.embedUrl, tutorial.embedUrl)
  })
})
