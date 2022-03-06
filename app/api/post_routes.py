from flask import Blueprint, request
from app.models import Post, db
from flask_login import login_required
from app.forms import NewPostForm

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


# ~~~~~~~~~~~ Create ~~~~~~~~~~~ 
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


# ~~~~~~~~~~~ Delete ~~~~~~~~~~~ 
@post_routes.route('/<post_id>', methods=['DELETE'])
@login_required
def delete_post(post_id):
    post = Post.query.filter_by(id=post_id).one()
    db.session.delete(post)
    db.session.commit()
    return post_id
