from app.models import db, Page


# Adds a demo user, you can add other users here if you want
def seed_pages():
    page1 = Page(
          userId = "1",
          url = "cats",
          title = "A World of Cats",
          text = "A page dedicated to my favorite cat pictures. Mainly made to share my cat-related thoughts, opinions and passions with family, friends and coworkers. Hope you enjoy!",
          location = "Sacramento, CA",
          link1Text = "my main page",
          link1Url = "https://www.tombetthauser.com/",
          link2Text = "some more cats",
          link2Url = "https://duckduckgo.com/?q=tortoise+shell+cat&t=ffab&iar=images&iax=images&ia=images",
          link3Text = "some videos",
          link3Url = "https://www.youtube.com/results?search_query=cats",
          contact = "catman@gmail.com"
        )

    db.session.add(page1)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_pages():
    db.session.execute('TRUNCATE pages RESTART IDENTITY CASCADE;')
    db.session.commit()
