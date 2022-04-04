import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';


const randomName = () => {
  const randomNames = [
    "Page Garden" 
    // "Minstagram", "Nullstagram", `${0/0}stagram`, "Nonestagram", "Unstagram", "Uninstagram", "Notstagram", "Notinstagram", "Studiogram", "tomstagram", "Deltagram", "Fosstagram", "Freestagram", "Libragram", "Funkstagram", "Whatstagram", "Winstagram", "Nutstagram", "Buttstagram", "Bugstagram", "Bustagram", "Flipstagram", "Smellstagram", "Stinkstagram", "Outstagram", "Catstagram", "Dogstagram", "Mingram", "Bugstagram", "Margatsni", "Zillagram", "Funstagram", "Lamestagram", "Gnustagram", "Newstagram", "Leavestagram", "Offstagram", "Nonstagram", "Othergram", "Neogram", "Xenogram", "Nostagram", "Xinstagram", "Finstagram", "Lauragram", "Coatstagram", "Isntstagram", "Isntgram", "Famstagram", "Frendstagram", "Friendstagram", "Brostagram", "Yologram", "Sacstagram", "Danstagram", "Tedstagram", "XFAgram", "FArtstagram", "SotAgram", "Hackstagram", "Upstagram", "Plustagram", "Minusgram", "Weakstagram", "Bizzarogram", "Oppositstagram", "Panopstogram", "Xanopstogram", "Basicgram", "Basestagram", "Antigram", "Weakstagram", "Lamestagram", "Frogstagram", "Slugstagram", "Bugstagram", "Simplegram", "Dullstagram", "Freakstagram", "Xinstagram = Xin = emotion / feeling / new / toilsome?",
  ]

  const randomIdx = Math.floor(Math.random() * randomNames.length);

  return randomNames[randomIdx];
}

const Splash = () => {
  const currUser = useSelector(state => state.session.user)
  
  const name = randomName();

  return (
    <splash>
      <h1 class="splash-title">{name}</h1>
      <p class="center-text">
        a cybernetic meadow<br />
        where mammals and computers<br />
        make random web pages in harmony<br />
        with no likes or follows<br />
      </p>
      {/* <h1 class="center-text">Minstagram</h1>
      <p class="center-text">
        Welcome to Minstagram.<br />
        No likes, no follows, no snitches.<br />
        Good luck finding anything!
      </p> */}
      {/* <h1 class="center-text">Notinstagram</h1> */}
      {/* <p class="center-text">
        Welcome to {name}.<br />
        Make pages, post images, share links.<br />
        No likes, no follows, no searches.<br />
        Pretending it's the nineties.
      </p> */}
      {/* <p class="center-text">
        a cybernetic meadow<br />
        where mammals and computers<br />
        make useless web pages in harmony<br />
        as if they were flowers<br />
        or something<br />
      </p> */}
      {/* <p class="center-text">
        A cybernetic ecology<br/>
        Where we are free of our labors<br/>
        And joined back to nature<br/>
        Through web pages<br/>
      </p> */}
      {/* <p class="center-text">
        Welcome to {name}.<br />
        It's mine, make your own website.<br />
        Or go back to <a href="https://instagram.com">Instagram</a> maybe.<br />
        It's ok if you stay too.
      </p> */}
      <p>
        {!currUser ? <NavLink to='/login' exact={true} activeClassName='active'>login</NavLink> : null}
        {!currUser ? <vr /> : null}
        {!currUser ? <NavLink to='/sign-up' exact={true} activeClassName='active'>sign up</NavLink> : null}
        {currUser ? <NavLink to={`/home`} exact={true} activeClassName='active'>home</NavLink> : null}
        {currUser ? <vr /> : null}
        {currUser ? <LogoutButton /> : null}
      </p>
      {/* <p class="instagram-link">
        miss the bs? head back to<a href="http://instagram.com">Instagram</a>
      </p> */}
    </splash>
  )
}

export default Splash;