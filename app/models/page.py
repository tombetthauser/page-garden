from .db import db


class Page(db.Model):
    __tablename__ = 'pages'

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, nullable=False)
    url = db.Column(db.String(255), nullable=False, unique=True)
    title = db.Column(db.String(255), nullable=True)
    text = db.Column(db.Text(), nullable=True)
    # favicon = db.Column(db.Text(), nullable=True) # <------------- needs to be added
    # font = db.Column(db.Text(), nullable=True) # <------------- needs to be added
    # linkColor = db.Column(db.Text(), nullable=True) # <------------- needs to be added
    location = db.Column(db.String(255), nullable=True)
    link1Text = db.Column(db.String(255), nullable=True)
    link1Url = db.Column(db.String(2048), nullable=True)
    link2Text = db.Column(db.String(255), nullable=True)
    link2Url = db.Column(db.String(2048), nullable=True)
    link3Text = db.Column(db.String(255), nullable=True)
    link3Url = db.Column(db.String(2048), nullable=True)
    # link4Text = db.Column(db.String(255), nullable=True) <------------- consider adding more links
    # link4Url = db.Column(db.String(2048), nullable=True)
    # link5Text = db.Column(db.String(255), nullable=True)
    # link5Url = db.Column(db.String(2048), nullable=True)
    contact = db.Column(db.String(255), nullable=True)
    posts = db.relationship('Post', back_populates='page', cascade="all, delete")

    def to_dict(self):
        return {
          "id": self.id,
          "userId": self.userId,
          "url": self.url,
          "title": self.title,
          "text": self.text,
          "location": self.location,
          "link1Text": self.link1Text,
          "link1Url": self.link1Url,
          "link2Text": self.link2Text,
          "link2Url": self.link2Url,
          "link3Text": self.link3Text,
          "link3Url": self.link3Url,
          "contact": self.contact
        }
