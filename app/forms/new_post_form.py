from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError
from app.models import Page


# def post_exists(form, field):
#     # Checking if post exists
#     url = field.data
#     post = Post.query.filter(Post.url == url).first()
#     if post:
#         raise ValidationError('Post url is address is already in use.')


def bad_page_id(form, field):
    pageId = int(field.data)
    page = Page.query.filter(Page.id == pageId).first()
    if not page:
        raise ValidationError('Page Id does not exist.')

class NewPostForm(FlaskForm):
    # pageId: StringField('pageId', validators=[DataRequired(), bad_page_id])
    pageId: StringField('pageId')
    imageUrl: StringField('imageUrl')
    title: StringField('title')
    text: StringField('text')
    location: StringField('location')
    linkText: StringField('linkText')
    linkUrl: StringField('linkUrl')
    date: StringField('date')
    # print("\n\n\n\n", pageId, "FROM new_post_form <~~~~~~~~~~~~~~~~~~~~~\n\n\n\n\n")
