import React, { PropTypes } from 'react';

export default function Image({ img }) {
  return (
    <img src={img}/>
  );
}

Image.propTypes = {
  img: PropTypes.string
};
