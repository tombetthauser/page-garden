from flask import Blueprint, jsonify, request, send_from_directory, url_for, current_app
from subprocess import Popen, PIPE, check_output
from flask_login import login_required
from app.api.post_routes import posts
from app.models import Page, Post, db
from app.forms import NewPageForm
import os


from app.s3_helpers import (upload_file_to_s3, allowed_file, get_unique_filename, delete_file_from_s3)

page_routes = Blueprint('pages', __name__)


# ~~~~~~~~~~~ Errors ~~~~~~~~~~~ 
def error_messages(validation_errors):
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


# ~~~~~~~~~~~ Get All ~~~~~~~~~~~ 
@page_routes.route('/', methods=['GET'])
def pages():
  pages = Page.query.all()
  return {'pages': [page.to_dict() for page in pages]}


# ~~~~~~~~~~~ Get One by Url ~~~~~~~~~~~ 
@page_routes.route('/urls/<string:pageUrl>')
def page_byUrl(pageUrl):
  page = Page.query.filter_by(url=pageUrl).one()
  return page.to_dict()


# ~~~~~~~~~~~ Get One ~~~~~~~~~~~ 
@page_routes.route('/<int:id>')
def page(id):
  page = Page.query.get(id)
  return page.to_dict()


# ~~~~~~~~~~~ Working Create ~~~~~~~~~~~ 
@page_routes.route('/new', methods=['POST'])
def create_page():
  form = NewPageForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    page = Page(
      userId = form.data["userId"],
      url = form.data["url"],
      title = form.data["title"],
      text = form.data["text"],
      location = form.data["location"],
      link1Text = form.data["link1Text"],
      link1Url = form.data["link1Url"],
      link2Text = form.data["link2Text"],
      link2Url = form.data["link2Url"],
      link3Text = form.data["link3Text"],
      link3Url = form.data["link3Url"],
      contact = form.data["contact"]
    )
    db.session.add(page)
    db.session.commit()
    return page.to_dict()
  else:
    return {'errors': error_messages(form.errors)}, 401


# ~~~~~~~~~~~ Edit ~~~~~~~~~~~ 
@page_routes.route('/<page_id>', methods=['PUT'])
@login_required
def edit_message(page_id):
  page = Page.query.filter_by(id=page_id).one()
  page_data = request.json
  page.userId = page_data['userId']
  page.url = page_data['url']
  page.title = page_data['title']
  page.text = page_data['text']
  page.location = page_data['location']
  page.link1Text = page_data['link1Text']
  page.link1Url = page_data['link1Url']
  page.link2Text = page_data['link2Text']
  page.link2Url = page_data['link2Url']
  page.link3Text = page_data['link3Text']
  page.link3Url = page_data['link3Url']
  page.contact = page_data['contact']

  db.session.commit()
  return jsonify(page.to_dict())


# ~~~~~~~~~~~ All Page Posts ~~~~~~~~~~~ 
@page_routes.route('/<page_id>/posts', methods=['GET'])
def all_page_posts(page_id):
  posts = Post.query.filter_by(pageId=page_id).order_by(Post.id.desc()).all()
  return {'posts': [post.to_dict() for post in posts]}


# ~~~~~~~~~~~ Delete ~~~~~~~~~~~ 
@page_routes.route('/<page_id>', methods=['DELETE']) # <------- this might be super unsafe since any logged in user could delete any post just from the api route?
@login_required
def delete_page(page_id):
    page = Page.query.filter_by(id=page_id).one()
    posts = Post.query.filter_by(pageId=page_id)

    for post in posts:
      try:
        filename = post.imageUrl.split("/")[-1].lower()
        delete_file_from_s3(filename)
      except:
        pass

    db.session.delete(page)
    db.session.commit()
    return page_id



# ~~~~~~~~~~~ ImageMagick / Shell Script Test Route ~~~~~~~~~~~ 

"""
So far this is successfully doing the following:
  * curling an image from an external url
  * processing it with imagemagic to be black and white
  * saving the new processed version in app/static/input
  * the processed image can be accessed locally at localhost:5000/static/input/test-mono.jpg

What I need now:
  * I need to get the full url for the image on the deployed version of the app

The eventual goal is to:
  * curl an image from AWS
  * process it with imagemagick on heroku
  * delete the old AWS image
  * replace it with the processed version

There are easier ways to do this for simple imagemagick recoloring / resizing etc.
But I want to leave it open-ended so students can perform any kind 
of imagemagick script they want.
"""

@page_routes.route('/magick/<path:filename>', methods=['GET'])
def shell_test(filename):
    # some basic shell commands to run in the heroku shell
    ls_input = "ls ./app/static/input/"
    empty_folder = "rm ./app/static/input/*"

    # curls and successfully saves 
    # a random cat image in app/static/input
    grab_image = "curl -k https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/1200px-Cat03.jpg > ./app/static/input/test.jpg"

    # performs some random imagemagick processing 
    # and saves new images in app/static/input
    convert_mono = "convert ./app/static/input/test.jpg -type Grayscale ./app/static/input/test-mono.jpg"
    saturate_red = "convert ./app/static/input/test.jpg -colorspace HSL -channel R -separate ./app/static/input/test-red.jpg"

    # ~~~~~~~~~~ runs shell commands ~~~~~~~~~~
    check_output([empty_folder], shell=True)
    check_output([grab_image], shell=True)
    check_output([saturate_red], shell=True)
    check_output([convert_mono], shell=True)

    werkzeugFileWrapper = send_from_directory(current_app.static_folder, filename).response
    # testing this on heroku deployment
    # confirmed that this file wrapper seems to be working
    # going to try sending it to aws
    # then return the new aws url
    # wouldn't need the static url in that case

    # how do we get the url for this image 
    # so that can be used as an image src?
    # the image is being created and can be seen on localhost:5000/static/input/test-mono.jpg
    # Essentially I just need to know what to replace 'localhost' with...
    url = "???"

    # just returns the path for testing
    # return {'test': 'url --> {}'.format(url)}
    # return send_from_directory(current_app.static_folder, 'input/{}'.format(filename), as_attachment=True)
    # return send_from_directory(current_app.static_folder, 'input/{}'.format(filename))
    return {'test': '{}'.format(werkzeugFileWrapper)}
