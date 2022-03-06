from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError
from app.models import Page

def bad_page_id(form, field):
    pageId = int(field.data)
    page = Page.query.filter(Page.id == pageId).first()
    if not page:
        raise ValidationError('Page Id does not exist.')

class TestForm(FlaskForm):
  pageId = StringField('pageId', validators=[DataRequired(), bad_page_id])
  imageUrl = StringField('imageUrl')
  title = StringField('title')
  text = StringField('text')
  location = StringField('location')
  linkText = StringField('linkText')
  linkUrl = StringField('linkUrl')
  date = StringField('date')
