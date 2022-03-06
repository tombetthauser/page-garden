from flask import Blueprint, request
from app.models import Page, db
from flask_login import login_required
from app.forms import NewPageForm

page_routes = Blueprint('pages', __name__)


# ~~~~~~~~~~~ Errors ~~~~~~~~~~~ 
def error_messages(validation_errors):
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


# ~~~~~~~~~~~ Get All ~~~~~~~~~~~ 
@page_routes.route('/', methods=['GET'])
def pages():
  pages = Page.query.all()
  return {'pages': [page.to_dict() for page in pages]}


# ~~~~~~~~~~~ Get One ~~~~~~~~~~~ 
@page_routes.route('/<int:id>')
def page(id):
  page = Page.query.get(id)
  return page.to_dict()


# ~~~~~~~~~~~ Create ~~~~~~~~~~~ 
@page_routes.route('/test', methods=['POST'])
def create_page_2():
  form = NewPageForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  # print(form.data["cat"], "<~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
  if form.validate_on_submit():
    page = Page(
      userId = form.data["userId"],
      url = form.data["url"],
      title = form.data["title"],
      text = form.data["text"],
      location = form.data["location"],
      link1Text = form.data["link1Text"],
      link1Url = form.data["link1Url"],
      link2Text = form.data["link2Text"],
      link2Url = form.data["link2Url"],
      link3Text = form.data["link3Text"],
      link3Url = form.data["link3Url"],
      contact = form.data["contact"]
    )
    db.session.add(page)
    db.session.commit()
    return page.to_dict()
  else:
    return {'errors': error_messages(form.errors)}, 401


# ~~~~~~~~~~~ Delete ~~~~~~~~~~~ 
@page_routes.route('/<page_id>', methods=['DELETE'])
@login_required
def delete_page(page_id):
    page = Page.query.filter_by(id=page_id).one()
    db.session.delete(page)
    db.session.commit()
    return page_id
