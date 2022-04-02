from flask import Blueprint, jsonify, request
from app.api.post_routes import posts
from app.models import Page, Post, db
from flask_login import login_required
from app.forms import NewPageForm

from app.s3_helpers import (upload_file_to_s3, allowed_file, get_unique_filename, delete_file_from_s3)

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


# ~~~~~~~~~~~ Stupid Form Mistake Post not Pages Create ~~~~~~~~~~~ 
# @page_routes.route('/new', methods=['POST'])
# def create_page():
#   form = NewPageForm()
#   form['csrf_token'].data = request.cookies['csrf_token']

#   if "image" in request.files:
#     image = request.files["image"]
#     print("\n\n\n", {
#       "image": image
#     }, "\n\n\n")
#     if not allowed_file(image.filename):
#       return {"errors": ["File type not permitted"]}, 400

#     image.filename = get_unique_filename(image.filename)
#     upload = upload_file_to_s3(image)

#     if "url" not in upload:
#       return upload, 400

#     newImageUrl = upload["url"]

#     if form.validate_on_submit():
#       page = Page(
#         userId = form.data["userId"],
#         url = newImageUrl,
#         title = form.data["title"],
#         text = form.data["text"],
#         location = form.data["location"],
#         link1Text = form.data["link1Text"],
#         link1Url = form.data["link1Url"],
#         link2Text = form.data["link2Text"],
#         link2Url = form.data["link2Url"],
#         link3Text = form.data["link3Text"],
#         link3Url = form.data["link3Url"],
#         contact = form.data["contact"]
#       )
#       db.session.add(page)
#       db.session.commit()
#       return page.to_dict()
#     else:
#       return {'errors': error_messages(form.errors)}, 401
#   else:
#     if form.validate_on_submit():
#       page = Page(
#         userId = form.data["userId"],
#         title = form.data["title"],
#         text = form.data["text"],
#         location = form.data["location"],
#         link1Text = form.data["link1Text"],
#         link1Url = form.data["link1Url"],
#         link2Text = form.data["link2Text"],
#         link2Url = form.data["link2Url"],
#         link3Text = form.data["link3Text"],
#         link3Url = form.data["link3Url"],
#         contact = form.data["contact"]
#       )
#       db.session.add(page)
#       db.session.commit()
#       return page.to_dict()
#     else:
#       return {'errors': error_messages(form.errors)}, 401


# ~~~~~~~~~~~ Working Create ~~~~~~~~~~~ 
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
  posts = Post.query.filter_by(pageId=page_id).order_by(Post.id.desc()).all()
        # User.query.order_by(User.popularity.desc(),User.date_created.desc()).limit(10).all()
  return {'posts': [post.to_dict() for post in posts]}


# ~~~~~~~~~~~ Delete ~~~~~~~~~~~ 
@page_routes.route('/<page_id>', methods=['DELETE']) # <------- this might be super unsafe since any logged in user could delete any post just from the api route?
@login_required
def delete_page(page_id):
    page = Page.query.filter_by(id=page_id).one()
    posts = Post.query.filter_by(pageId=page_id)

    print('\n\n\n', {
      'posts': posts
    }, '\n\n\n')

    for post in posts:
        filename = post.imageUrl.split("/")[-1].lower()
        delete_file_from_s3(filename)
        db.session.delete(post)
        db.session.commit()

    db.session.delete(page)
    db.session.commit()
    return page_id
