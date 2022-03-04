from flask import Blueprint, jsonify, session, request
from app.models import Page, db
from app.forms import NewPageForm

page_routes = Blueprint('pages', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@page_routes.route('/', methods=['GET'])
def pages():
  pages = Page.query.all()
  return {'pages': [page.to_dict() for page in pages]}


@page_routes.route('/<int:id>')
def page(id):
  page = Page.query.get(id)
  return page.to_dict()


# @page_routes.route('/', methods=['POST'])
# def create_page():
#   form = NoteForm()
#   form['csrf_token'].data = request.cookies['csrf_token']
#   if form.validate_on_submit():
#       note = Note(user_id=form['user_id'].data,
#                   group_id=form['group_id'].data,
#                   note_title=form['note_title'].data
#                   )
#       db.session.add(note)
#       db.session.commit()
#       return note.to_dict()
#   return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@page_routes.route('/test', methods=['POST'])
def create_page_2():
  print("TESTING FORM! <------------------------------")
  form = NewPageForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    print("FORM VALID! <------------------------------")
    print(form.userId.data)
    print(form.title.data)
  else:
    print("FORM NOT VALID! <------------------------------")
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
  return {'foo': 'bar'}

  # Page creation and db add / commit working
  # page = Page(
  #   userId = "1",
  #   url = "url!",
  #   title = "title!",
  #   text = "text!",
  #   location = "location!",
  #   link1Text = "link1Text!",
  #   link1Url = "link1Url!",
  #   link2Text = "link2Text!",
  #   link2Url = "link2Url!",
  #   link3Text = "link3Text!",
  #   link3Url = "link3Url!",
  #   contact = "contact!",
  # )
  # db.session.add(page)
  # db.session.commit()
  # return {'foo': 'bar'}

  # testing...

    # return page.to_dict()

    # form = NewPageForm()
    # form['csrf_token'].data = request.cookies['csrf_token']
    # if form.validate_on_submit():
    #     page = Page(
    #         userId=form.data['userId'],
    #         url=form.data['url'],
    #         title=form.data['title'],
    #         text=form.data['text'],
    #         location=form.data['location'],
    #         link1Text=form.data['link1Text'],
    #         link1Url=form.data['link1Url'],
    #         link2Text=form.data['link2Text'],
    #         link2Url=form.data['link2Url'],
    #         link3Text=form.data['link3Text'],
    #         link3Url=form.data['link3Url'],
    #         contact=form.data['contact']
    #     )
    #     db.session.add(page)
    #     db.session.commit()
    #     return page.to_dict()
    # return {'errors': validation_errors_to_error_messages(form.errors)}, 401
