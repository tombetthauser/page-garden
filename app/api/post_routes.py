from flask import Blueprint, request, jsonify
from app.models import Post, db
from flask_login import login_required
from app.forms import NewPostForm

from app.s3_helpers import (
    upload_file_to_s3, allowed_file, get_unique_filename)

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


# ~~~~~~~~~~~ Broken Almost Working New Create with Image ~~~~~~~~~~~ 
# @post_routes.route('/new', methods=['POST'])
# def create_post():
#   form = NewPostForm()
#   form['csrf_token'].data = request.cookies['csrf_token']

#   if "image" in request.files:
#     image = request.files["image"]
#     # print("\n\n\n", {
#     #   "image": image
#     # }, "\n\n\n")
#     if not allowed_file(image.filename):
#       return {"errors": ["File type not permitted"]}, 400

#     image.filename = get_unique_filename(image.filename)
#     upload = upload_file_to_s3(image)

#     if "url" not in upload:
#       return upload, 400

#     newImageUrl = upload["url"]

#     if form.validate_on_submit():
#       post = Post(
#         url = newImageUrl,
#         pageId = form.data["pageId"],
#         title = form.data["title"],
#         text = form.data["text"],
#         location = form.data["location"],
#         linkText = form.data["linkText"],
#         linkUrl = form.data["linkUrl"],
#         date = form.data["date"],
#       )
#       db.session.add(post)
#       db.session.commit()
#       return post.to_dict()
#     else:
#       return {'errors': error_messages(form.errors)}, 401
#   else:
#     if form.validate_on_submit():
#       post = Post(
#         pageId = form.data["pageId"],
#         title = form.data["title"],
#         text = form.data["text"],
#         location = form.data["location"],
#         linkText = form.data["linkText"],
#         linkUrl = form.data["linkUrl"],
#         date = form.data["date"],
#       )
#       db.session.add(post)
#       db.session.commit()
#       return post.to_dict()
#     else:
#       return {'errors': error_messages(form.errors)}, 401



# ~~~~~~~~~~~ Old Working Create ~~~~~~~~~~~ 
@post_routes.route('/new', methods=['POST'])
def create_post():
  form = NewPostForm()
  form['csrf_token'].data = request.cookies['csrf_token']
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
    return {'errors': error_messages(form.errors)}, 401



# ~~~~~~~~~~~ New Create Route ~~~~~~~~~~~ 
@post_routes.route('/awspost', methods=['POST'])
def create_aws_post():
  form = NewPostForm()
  form['csrf_token'].data = request.cookies['csrf_token']

  url = "https://thishorsedoesnotexist.com/"

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
  else:
    return {'errors': error_messages(form.errors)}, 401



# # ~~~~~~~~~~~ Dummy Create Image Working! ~~~~~~~~~~~ 
# @post_routes.route("test", methods=["POST"])
# @login_required
# def upload_image():
#     if "image" not in request.files:
#         return {"errors": "image required"}, 400

#     image = request.files["image"]
#     form = NewPostForm()
#     print("\n\n", {"form.data":form.data}, "<--------------------------------------------------\n\n")

#     if not allowed_file(image.filename):
#         return {"errors": "file type not permitted"}, 400
    
#     image.filename = get_unique_filename(image.filename)

#     upload = upload_file_to_s3(image)

#     if "url" not in upload:
#         # if the dictionary doesn't have a url key
#         # it means that there was an error when we tried to upload
#         # so we send back that error message
#         return upload, 400

#     url = upload["url"]
#     # flask_login allows us to get the current user from the request
#     # new_image = Image(user=current_user, url=url)
#     # db.session.add(new_image)
#     # db.session.commit()

#     post = Post(
#       pageId = 1,
#       imageUrl = url,
#       title = "NEW from the image_routes!",
#       text = "",
#       location = "",
#       linkText = "",
#       linkUrl = "",
#       date = "",
#     )
#     db.session.add(post)
#     db.session.commit()
#     return post.to_dict()



# ~~~~~~~~~~~ Edit ~~~~~~~~~~~ 
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
    post = Post.query.filter_by(id=post_id).one()
    db.session.delete(post)
    db.session.commit()
    return post_id
