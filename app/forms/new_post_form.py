from wsgiref.validate import validator
from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError
from app.models import Page, Post

def bad_page_id(form, field):
    pageId = int(field.data)
    page = Page.query.filter(Page.id == pageId).first()
    if not page:
        raise ValidationError('Page Id does not exist.')

def image_url_used(form, field):
  image_url = field.data
  post = Post.query.filter(Post.imageUrl == image_url).first()
  if post:
      raise ValidationError('Image Url already in use.')


class NewPostForm(FlaskForm):
  pageId = StringField('pageId', validators=[DataRequired(), bad_page_id])
  # imageUrl = StringField('imageUrl', validators=[image_url_used])
  imageUrl = StringField('imageUrl')
  title = StringField('title')
  text = StringField('text')
  location = StringField('location')
  linkText = StringField('linkText')
  linkUrl = StringField('linkUrl')
  date = StringField('date')
