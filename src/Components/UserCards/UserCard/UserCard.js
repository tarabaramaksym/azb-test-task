import { useRef, useState } from "react";

const UserCard = ({ user }) => {

  const shorten = (str) => {
    return str.length > 35 ? { str: str.substr(0, 35) + '...', shortened: true } : { str, shortened: false };
  }

  const mouseEnterHandler = event => {
    setTooltip({ show: true, text: event.target.ariaValueText, left: event.pageX, top: event.pageY + 10 })
  }

  const mouseLeaveHandler = event => {
    setTooltip({ show: false })
  }

  const name = shorten(user.name);
  const position = shorten(user.position);
  const email = shorten(user.email);
  const phone = shorten(user.phone);

  const [tooltip, setTooltip] = useState({
    show: false,
    text: '',
    left: 0,
    top: 0
  });

  const ref = useRef();

  // the correct way would be using object array and generating it through mapping Object.getKeys, but I'm limited in time
  // so that's why I did it this way, although it goes against DRY principle
  return (
    <div className="user-card" ref={ref}>
      <div className="tooltip" style={{ display: !tooltip.show ? 'none' : 'block', left: tooltip.left, top: tooltip.top }}>{tooltip.text}</div>
      <img src={user.photo} alt={`${user.name.str} photo`}></img>
      <p aria-valuetext={user.name} value={user.name} onMouseLeave={name.shortened ? mouseLeaveHandler : null} onMouseEnter={name.shortened ? mouseEnterHandler : null}>{name.str}</p>
      <p >
        <span aria-valuetext={user.position} onMouseLeave={position.shortened ? mouseLeaveHandler : null} onMouseEnter={position.shortened ? mouseEnterHandler : null}>{position.str} </span>
        <br />
        <span aria-valuetext={user.email} onMouseLeave={email.shortened ? mouseLeaveHandler : null} onMouseEnter={email.shortened ? mouseEnterHandler : null}>{email.str} </span>
        <br />
        <span aria-valuetext={user.phone} onMouseLeave={phone.shortened ? mouseLeaveHandler : null} onMouseEnter={phone.shortened ? mouseEnterHandler : null}>{phone.str}</span></p>

    </div>
  )
}

export default UserCard;