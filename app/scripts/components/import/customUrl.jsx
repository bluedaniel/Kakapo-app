import React, { PropTypes } from 'react';
import { soundActions, notifyActions } from 'actions/';
import { TextInput } from 'components/ui';
import { validHowl, validUrl, handleStopPropagation } from 'utils/';

export default function CustomUrl({ themes, intl, dispatch }, { router }) {
  const handleError = (msg, translateMsg = true) => {
    const err = translateMsg ? intl.formatMessage({ id: msg }) : msg;
    dispatch(notifyActions.send(err));
  };

  const handleSubmit = (el) => {
    handleStopPropagation(el);
    const inputs = el.target.getElementsByTagName('input');
    const data = Array.from(inputs).reduce((acc, a) => ({
      ...acc, [a.name]: a.value
    }), { source: 'customStream' });

    if (!data.name || !data.url) return handleError('import.error.empty');
    if (!validUrl(data.url)) return handleError('import.error.url');
    if (!validHowl(data.url)) return handleError(validHowl(data.url, true), false);

    dispatch(soundActions.addSound('custom', data));
    return router.push('/');
  };

  return (
    <div className="customurl">
      <h5>{intl.formatMessage({ id: 'import.custom.header' })}</h5>
      <form onSubmit={handleSubmit}>
        <div className="media-import">
          <TextInput placeholder="import.custom.name_placeholder" name="name" intl={intl} />
          <TextInput placeholder="import.custom.url_placeholder" name="url" intl={intl} />
          <button className="button"
            style={{ backgroundColor: themes.get('btn'), borderColor: themes.get('btn') }}>
            {intl.formatMessage({ id: 'import.save' })}
          </button>
        </div>
      </form>
    </div>
  );
}

CustomUrl.contextTypes = { router: PropTypes.object };
