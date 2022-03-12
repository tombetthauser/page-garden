from .db import db

class Post(db.Model):
    __tablename__ = 'posts'

    id = db.Column(db.Integer, primary_key=True)
    pageId = db.Column(db.Integer, db.ForeignKey('pages.id'), nullable=False)
    imageUrl = db.Column(db.String(255), nullable=False)
    # aspectRatio = db.Column(db.String(255), nullable=False) # <----------------- consider adding, regulated with a dropdown [unchanged, square, 3/4]
    title = db.Column(db.String(255), nullable=True)
    text = db.Column(db.Text(), nullable=True)
    location = db.Column(db.String(255), nullable=True)
    linkText = db.Column(db.String(255), nullable=True)
    linkUrl = db.Column(db.String(2048), nullable=True)
    date = db.Column(db.String(255), nullable=True)
    page = db.relationship('Page', back_populates='posts')

    def to_dict(self):
        return {
          'id': self.id,
          'pageId': self.pageId,
          'imageUrl': self.imageUrl,
          'title': self.title,
          'text': self.text,
          'location': self.location,
          'linkText': self.linkText,
          'linkUrl': self.linkUrl,
          'date': self.date
        }
