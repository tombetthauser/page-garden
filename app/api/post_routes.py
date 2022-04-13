from flask import Blueprint, request, jsonify
from app.models import Post, db
from flask_login import login_required
from app.forms import NewPostForm

from app.s3_helpers import (
    upload_file_to_s3, 
    allowed_file, 
    get_unique_filename,
    delete_file_from_s3
  )

post_routes = Blueprint('posts', __name__)


# ~~~~~~~~~~~ Errors ~~~~~~~~~~~ 
def error_messages(validation_errors):
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


# ~~~~~~~~~~~ Get All ~~~~~~~~~~~ 
@post_routes.route('/', methods=['GET'])
def posts():
  posts = Post.query.all()
  return {'posts': [post.to_dict() for post in posts]}


# ~~~~~~~~~~~ Get One ~~~~~~~~~~~ 
@post_routes.route('/<int:id>')
def post(id):
  post = Post.query.get(id)
  return post.to_dict()
  

# ~~~~~~~~~~~ AWS Create Route ~~~~~~~~~~~ 
@post_routes.route('/new', methods=['POST'])
def create_aws_post():
  form = NewPostForm()
  form['csrf_token'].data = request.cookies['csrf_token']

  if "image" not in request.files:
    if form.validate_on_submit():
      post = Post(
        pageId = form.data["pageId"],
        imageUrl = form.data["imageUrl"],
        title = form.data["title"],
        text = form.data["text"],
        location = form.data["location"],
        linkText = form.data["linkText"],
        linkUrl = form.data["linkUrl"],
        date = form.data["date"],
      )
      db.session.add(post)
      db.session.commit()
      return post.to_dict()

  else:
    image = request.files["image"]

    if not allowed_file(image.filename):
      return {"errors": "file type not permitted"}, 400

    image.filename = get_unique_filename(image.filename)
    upload = upload_file_to_s3(image)

    if "url" not in upload:
      return upload, 400

    url = upload["url"]

    if form.validate_on_submit():
      post = Post(
        pageId = form.data["pageId"],
        imageUrl = url,
        title = form.data["title"],
        text = form.data["text"],
        location = form.data["location"],
        linkText = form.data["linkText"],
        linkUrl = form.data["linkUrl"],
        date = form.data["date"],
      )
      db.session.add(post)
      db.session.commit()
      return post.to_dict()

  return {'errors': error_messages(form.errors)}, 401


# ~~~~~~~~~~~ No AWS Edit ~~~~~~~~~~~ 
@post_routes.route('/<post_id>', methods=['PUT'])
@login_required
def edit_message(post_id):
  post = Post.query.filter_by(id=post_id).one()
  post_data = request.json
  post.pageId = post_data['pageId']
  post.imageUrl = post_data['imageUrl']
  post.title = post_data['title']
  post.text = post_data['text']
  post.location = post_data['location']
  post.linkText = post_data['linkText']
  post.linkUrl = post_data['linkUrl']
  post.date = post_data['date']

  db.session.commit()
  return jsonify(post.to_dict())


# ~~~~~~~~~~~ Delete ~~~~~~~~~~~ 
@post_routes.route('/<post_id>', methods=['DELETE'])
@login_required
def delete_post(post_id):
    # if "clobber" in request:
      # print("\n\n\n", {
      #   "request": request
      # }, "\n\n\n")

    post = Post.query.filter_by(id=post_id).one()

    try:
      filename = post.imageUrl.split("/")[-1].lower()
      delete_file_from_s3(filename)
      db.session.delete(post)
      db.session.commit()
    except:
      db.session.delete(post)
      db.session.commit()
    
    return post_id