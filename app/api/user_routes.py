from urllib import request
from flask import Blueprint, jsonify, request
from app.api.page_routes import page
from flask_login import login_required
from app.models import User, Page, db
from app.forms import UserUpdateForm


user_routes = Blueprint('users', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages
    

@user_routes.route('/<int:user_id>', methods=['PUT'])
@login_required
def user_edit(user_id):
    form = UserUpdateForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        user = User.query.filter_by(id=user_id).one()
        user_data = request.json

        user.username = user_data['username']
        user.email = user_data['email']

        db.session.commit()
        return jsonify(user.to_dict())

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@user_routes.route('/')
# @login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
# @login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()


@user_routes.route('/<int:id>/pages')
# @login_required
def user_pages(id):
    pages = Page.query.filter_by(userId=id).all()
    return { 'pages': [ page.to_dict() for page in pages ] }
