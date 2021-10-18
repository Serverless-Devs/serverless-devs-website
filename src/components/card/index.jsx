import React from 'react';
import PropTypes from 'prop-types';
// import classnames from 'classnames';
import { getLink } from '../../../utils';
import './index.scss';

const propTypes = {
//   type: PropTypes.oneOf(['primary', 'normal']),
  link: PropTypes.string,
  target: PropTypes.string,
  imgSrc: PropTypes.string,
  name: PropTypes.string,
  date: PropTypes.string,
  subTitle: PropTypes.string,
  title: PropTypes.string,
  tags: PropTypes.array,
  article:PropTypes.string,
};
const defaultProps = {
//   type: 'primary',
//   link: '',
  target: '_blank',
};
const Card = (props) => {
  return (
    // <a
    //   className={
    //     classnames({
    //       button: true,
    //       [`button-${props.type}`]: true,
    //     })
    //   }
    //   target={props.target || '_self'}
    //   href={getLink(props.link)}
    // >
    //   {props.children}
    // </a>
    <a
      className="card-container"
      target={props.target || '_blank'}
      href={getLink(props.link)}
    >
      <div className="card-left">
        <img src={props.imgSrc} />
        <p className="name">{props.name}</p>
        <p className="date">{props.date}</p>
      </div>
      <div className="card-right">
        <div className="title">
            {
            props.subTitle.length>0 && 
            (
                <div className="title-subtitle">
                    <span>{props.subTitle}</span>
                    <span className="split"></span>
                </div>
            )
            }
            <span>{props.title}</span>
            {
                props.tags.map((item,i)=>(
                    <div className="tag">{item}</div>
                ))
            }
        </div>
        <div className="article">
            <div className="body">{props.article}</div>
            <div className="read-more">阅读全文</div>
        </div>
      </div>
    </a>
  );
};

Card.propTypes = propTypes;
Card.defaultProps = defaultProps;

export default Card;
