from flask import Blueprint, jsonify
from app.models import Page

page_routes = Blueprint('page', __name__)


@page_routes.route('/')
def pages():
  pages = Page.query.all()
  return {'pages': [page.to_dict() for page in pages]}


@page_routes.route('/<int:id>')
def page(id):
  page = Page.query.get(id)
  return page.to_dict()
