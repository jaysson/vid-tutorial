import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ReactAppController {
  public show({ view }: HttpContextContract) {
    return view.render('react-app')
  }
}
