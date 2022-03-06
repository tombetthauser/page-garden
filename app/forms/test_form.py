from flask_wtf import FlaskForm
from wtforms import StringField

class TestForm(FlaskForm):
  pageId = StringField('pageId')
  imageUrl = StringField('imageUrl')
  title = StringField('title')
  text = StringField('text')
  location = StringField('location')
  linkText = StringField('linkText')
  linkUrl = StringField('linkUrl')
  date = StringField('date')
