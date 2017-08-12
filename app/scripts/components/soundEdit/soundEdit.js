import React from 'react';
import { prop } from 'ramda';
import { soundActions, notifyActions } from 'actions/';
import { handleStopPropagation } from 'utils/';
import TextInput from '../ui/textInput/textInput';

export default ({ sound, themes, intl, dispatch }) => {
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
        [a.name]: a.value
      }),
      {}
    );

    if (!data.name) {
      return dispatch(
        notifyActions.send(intl.formatMessage({ id: 'import.error.empty' }))
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
          intl={intl}
        />
        <TextInput
          placeholder="list.editing_tag"
          name="tags"
          value={sound.tags}
          intl={intl}
        />
        <a className="button" role="link" tabIndex={-1} onClick={handleCancel}>
          {intl.formatMessage({ id: 'list.cancel' })}
        </a>
        <button
          className="button"
          style={{
            backgroundColor: prop('btn', themes),
            borderColor: prop('btn', themes)
          }}
        >
          {intl.formatMessage({ id: 'list.save' })}
        </button>
      </form>
    </div>
  );
};
