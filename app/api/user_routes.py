from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/test', methods=['GET'])
def users_test():
  # pages = Page.query.all()
  print("USERS TEST ROUTE HIT <--------------------------------")
  # return {'pages': [page.to_dict() for page in pages]}
  return {"foo": "bar"}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()
