import React from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { pick, prop } from 'ramda';
import { FormattedMessage } from 'react-intl';
import { soundActions, notifyActions } from 'actions/';
import { validHowl, validUrl, handleStopPropagation } from 'utils/';
import TextInput from '../ui/textInput/textInput';

export const CustomUrl = ({ themes, dispatch }) => {
  const handleError = (msg, translateMsg = true) => {
    const err = translateMsg ? <FormattedMessage id={msg} /> : msg;
    dispatch(notifyActions.send(err));
  };

  const handleSubmit = el => {
    handleStopPropagation(el);
    const inputs = el.target.getElementsByTagName('input');
    const data = Array.from(inputs).reduce(
      (acc, a) => ({
        ...acc,
        [a.name]: a.value,
      }),
      { source: 'customStream' }
    );

    if (!data.name || !data.url) return handleError('import.error.empty');
    if (!validUrl(data.url)) return handleError('import.error.url');
    if (!validHowl(data.url))
      return handleError(validHowl(data.url, true), false);

    dispatch(soundActions.addSound('custom', data));
    return dispatch(push('/'));
  };

  return (
    <div className="customurl">
      <h5>
        <FormattedMessage id="import.custom.header" />
      </h5>
      <form onSubmit={handleSubmit}>
        <div className="media-import">
          <TextInput placeholder="import.custom.name_placeholder" name="name" />
          <TextInput placeholder="import.custom.url_placeholder" name="url" />
          <button
            className="button"
            type="button"
            style={{
              backgroundColor: prop('btn', themes),
              borderColor: prop('btn', themes),
            }}
          >
            <FormattedMessage id="import.save" />
          </button>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = pick(['themes']);

export default connect(mapStateToProps)(CustomUrl);
