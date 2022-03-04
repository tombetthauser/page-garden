from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError
from app.models import Page, User


def page_exists(_form, field):
    # Checking if page exists
    url = field.url
    page = Page.query.filter(Page.url == url).first()
    if page:
        raise ValidationError('Page url is address is already in use.')


def bad_user_id(_form, field):
    # Checking if page exists
    userId = field.userId
    user = User.query.filter(User.id == userId).first()
    if not user:
        raise ValidationError('User Id does not exist.')


class NewPageForm(FlaskForm):
    userId = StringField('userId')
    url = StringField('url')
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
    # userId = StringField('userId', validators=[DataRequired(), bad_user_id])
    # url = StringField('url', validators=[DataRequired(), page_exists])
    # title = StringField('title', validators=[])
    # text = StringField('text', validators=[])
    # location = StringField('location', validators=[])
    # link1Text = StringField('link1Text', validators=[])
    # link1Url = StringField('link1Url', validators=[])
    # link2Text = StringField('link2Text', validators=[])
    # link2Url = StringField('link2Url', validators=[])
    # link3Text = StringField('link3Text', validators=[])
    # link3Url = StringField('link3Url', validators=[])
    # contact = StringField('contact', validators=[])

