import React from 'react';
import { FormattedMessage } from 'react-intl';
import { prop } from 'ramda';
import { soundActions, notifyActions } from 'actions/';
import { handleStopPropagation } from 'utils/';
import TextInput from '../ui/textInput/textInput';

export default ({ sound, themes, dispatch }) => {
  const handleCancel = el => {
    handleStopPropagation(el);
    dispatch(soundActions.edit(sound, null));
  };

  const handleSubmit = el => {
    handleStopPropagation(el);
    const inputs = el.target.getElementsByTagName('input');
    const data = Array.from(inputs).reduce(
      (acc, a) => ({
        ...acc,
        [a.name]: a.value,
      }),
      {}
    );

    if (!data.name) {
      return dispatch(
        notifyActions.send(<FormattedMessage id="import.error.empty" />)
      );
    }
    return dispatch(soundActions.edit(sound, data));
  };

  return (
    <div className="item editing">
      <form onSubmit={handleSubmit}>
        <TextInput
          placeholder="list.editing_name"
          name="name"
          value={sound.name}
        />
        <TextInput
          placeholder="list.editing_tag"
          name="tags"
          value={sound.tags}
        />
        <a className="button" role="link" tabIndex={-1} onClick={handleCancel}>
          <FormattedMessage id="list.cancel" />
        </a>
        <button
          className="button"
          type="button"
          style={{
            backgroundColor: prop('btn', themes),
            borderColor: prop('btn', themes),
          }}
        >
          <FormattedMessage id="list.save" />
        </button>
      </form>
    </div>
  );
};
