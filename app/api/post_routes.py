from flask import Blueprint
from app.models import Post

post_routes = Blueprint('post', __name__)


@post_routes.route('/')
def posts():
  posts = Post.query.all()
  return {'posts': [post.to_dict() for post in posts]}


@post_routes.route('/<int:id>')
def post(id):
  post = Post.query.get(id)
  return post.to_dict()