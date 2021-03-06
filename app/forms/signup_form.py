from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')

def bad_string(form, field):
    good_chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_."
    for char in field.data:
        if char not in good_chars:
            raise ValidationError('cannot contain spaces or special characters')

def spaces(form, field):
    for char in field.data:
        if char == ' ':
            raise ValidationError('cannot contain spaces')


class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired(), username_exists, bad_string])
    email = StringField('email', validators=[DataRequired(), user_exists, spaces])
    password = StringField('password', validators=[DataRequired(), spaces])
