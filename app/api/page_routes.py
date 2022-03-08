from flask import Blueprint, jsonify, request
from app.api.post_routes import posts
from app.models import Page, Post, db
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


# ~~~~~~~~~~~ Get One by Url ~~~~~~~~~~~ 
@page_routes.route('/urls/<string:pageUrl>')
def page_byUrl(pageUrl):
  page = Page.query.filter_by(url=pageUrl).one()
  return page.to_dict()


# ~~~~~~~~~~~ Get One ~~~~~~~~~~~ 
@page_routes.route('/<int:id>')
def page(id):
  page = Page.query.get(id)
  return page.to_dict()


# ~~~~~~~~~~~ Create ~~~~~~~~~~~ 
@page_routes.route('/new', methods=['POST'])
def create_page():
  form = NewPageForm()
  form['csrf_token'].data = request.cookies['csrf_token']
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


# ~~~~~~~~~~~ Edit ~~~~~~~~~~~ 
@page_routes.route('/<page_id>', methods=['PUT'])
@login_required
def edit_message(page_id):
  page = Page.query.filter_by(id=page_id).one()
  page_data = request.json
  # page.example_field = page_data['example_field']
  page.userId = page_data['userId']
  page.url = page_data['url']
  page.title = page_data['title']
  page.text = page_data['text']
  page.location = page_data['location']
  page.link1Text = page_data['link1Text']
  page.link1Url = page_data['link1Url']
  page.link2Text = page_data['link2Text']
  page.link2Url = page_data['link2Url']
  page.link3Text = page_data['link3Text']
  page.link3Url = page_data['link3Url']
  page.contact = page_data['contact']

  db.session.commit()
  return jsonify(page.to_dict())


# ~~~~~~~~~~~ All Page Posts ~~~~~~~~~~~ 
@page_routes.route('/<page_id>/posts', methods=['GET'])
def all_page_posts(page_id):
  posts = Post.query.filter_by(pageId=page_id).all()
  return {'posts': [post.to_dict() for post in posts]}


# ~~~~~~~~~~~ Limited / Filtered / Sorted Page Posts ~~~~~~~~~~~ 
# https://www.merixstudio.com/blog/best-practices-rest-api-development/

# Filtering:
# GET /users?country=USA
# GET /users?creation_date=2019-11-11
# GET /users?creation_date=2019-11-11

# Sorting:
# GET /users?sort=birthdate_date:asc
# GET /users?sort=birthdate_date:desc

# Paging:
# GET /users?limit=100
# GET /users?offset=2

# All together:
# GET /users?country=USA&creation_date=2019-11-11&sort=birthdate_date:desc&limit=100&offset=2


# ~~~~~~~~~~~ Delete ~~~~~~~~~~~ 
@page_routes.route('/<page_id>', methods=['DELETE'])
@login_required
def delete_page(page_id):
    page = Page.query.filter_by(id=page_id).one()
    db.session.delete(page)
    db.session.commit()
    return page_id


# ~~~~~~~~~~~ New Page Post ~~~~~~~~~~~ 
"""
  This will give RESTful access to the parent page for a post.
  This means we can access the the user.
  Why do we need the user?
  We needed to know if we had edit access for a post.
  This was a problem with rendering an individual post view.
  This is a frontend problem not an api problem.
  So we dont need this?
"""
# @page_routes.route('</page_id>/posts/<post_id>/new', methods=['POST'])
# @login_required


# # ~~~~~~~~~~~ Edit Page Post ~~~~~~~~~~~ 
# @page_routes.route('</page_id>/posts/<post_id>', methods=['PUT'])
# @login_required