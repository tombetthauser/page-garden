from app.models import db, Post


# Adds a demo user, you can add other users here if you want
def seed_posts():
    post1 = Post(
          pageId= "1",
          imageUrl= "https://images.fineartamerica.com/images/artworkimages/mediumlarge/2/4-portrait-of-a-tortoiseshell-cat-panoramic-images.jpg",
          title= "Ready to kill...",
          text= "Another picture of a cat ready to kill it's heart beating with the primal rage of ten million years coursing through its claws sharpened and ready for the attack to inspire terror to kill to snuff out the flame of an innocent life unprepared for the cruelty of nature and the universe itself that is the cat.",
          location= "Sacramento, CA",
          linkText= "more cat pics",
          linkUrl= "https://duckduckgo.com/?q=tortoise+shell+cat&t=ffab&iar=images&iax=images&ia=images",
          date= "March 17th, 2020"
        )

    db.session.add(post1)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_posts():
    db.session.execute('TRUNCATE posts RESTART IDENTITY CASCADE;')
    db.session.commit()
