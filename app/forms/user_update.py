from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


def email_exists(form, field):
    # Checking if user exists
    email = field.data
    currUserId = int(form.data['id'])
    user = User.query.filter(User.email == email).first()
    if user and user.id != currUserId:
        raise ValidationError('email address is already in use')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    currUserId = int(form.data['id'])
    user = User.query.filter(User.username == username).first()
    if user and user.id != currUserId:
        raise ValidationError('username is already in use')

def bad_string(form, field):
    good_chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_."
    for char in field.data:
        if char not in good_chars:
            raise ValidationError('cannot contain spaces or special characters')

def spaces(form, field):
    for char in field.data:
        if char == ' ':
            raise ValidationError('cannot contain spaces')

def password_matches(form, field):
    # Checking if password matches
    password = field.data
    email = form.data['email']
    user = User.query.filter(User.email == email).first()
    if not user:
        raise ValidationError('no such user exists')
    if not user.check_password(password):
        raise ValidationError('password incorrect')


class UserUpdateForm(FlaskForm):
    id = StringField('id')
    username = StringField(
        'username', validators=[DataRequired(), username_exists, bad_string])
    email = StringField('email', validators=[DataRequired(), email_exists, spaces])
    password = StringField('password', validators=[DataRequired(), password_matches])
