from flask import Blueprint, jsonify
from app.models import Page
from app.forms import NewPageForm

page_routes = Blueprint('page', __name__)


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


@page_routes.route('/', methods=['POST'])
# @page_routes.route('/test', methods=['GET'])
def create_note():
  print("TEST ROUTE HIT <--------------------------------")
    # form = NoteForm()
    # form['csrf_token'].data = request.cookies['csrf_token']
    # if form.validate_on_submit():
    #     note = Note(user_id=form['user_id'].data,
    #                 group_id=form['group_id'].data,
    #                 note_title=form['note_title'].data
    #                 )
    #     db.session.add(note)
    #     db.session.commit()
    #     return note.to_dict()
    # return {'errors': validation_errors_to_error_messages(form.errors)}, 401
  return {"foo": "bar"}


@page_routes.route('/', methods=['POST'])
def create_page():
    # page = Page(
    #     userId='1',
    #     url='test-test',
    #     title='Test Page',
    #     text='Blah blah this is my text check it out blah blah.',
    #     location='San Franpsycho, CA',
    #     link1Text='a link to google',
    #     link1Url='http://google.com',
    #     link2Text='',
    #     link2Url='',
    #     link3Text='',
    #     link3Url='',
    #     contact='tom@mail.com'
    # )
    # db.session.add(page)
    # db.session.commit()
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
    print("TESTING! <------------------------------")
