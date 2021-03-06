from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError
from app.models import Page, User


def page_exists(form, field):
    url = field.data
    page = Page.query.filter(Page.url == url).first()
    if page:
        raise ValidationError('already in use')

def bad_user_id(form, field):
    userId = int(field.data)
    user = User.query.filter(User.id == userId).first()
    if not user:
        raise ValidationError('user id does not exist')

def bad_string(form, field):
    good_chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-"
    for char in field.data:
        if char not in good_chars:
            raise ValidationError('cannot contain spaces or special characters')

class NewPageForm(FlaskForm):
    userId = StringField('userId', validators=[DataRequired(), bad_user_id])
    url = StringField('url', validators=[DataRequired(), page_exists, bad_string])
    title = StringField('title')
    text = StringField('text')
    location = StringField('location')
    link1Text = StringField('link1Text')
    link1Url = StringField('link1Url')
    link2Text = StringField('link2Text')
    link2Url = StringField('link2Url')
    link3Text = StringField('link3Text')
    link3Url = StringField('link3Url')
    contact = StringField('contact')