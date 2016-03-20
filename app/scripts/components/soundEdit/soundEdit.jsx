import React from 'react';
import { TextInput } from 'components/ui';
import { soundActions } from 'actions/';
import { toasterInstance } from 'utils/';

export default ({ sound, themes, intl, dispatch }) => {
  const handleCancel = (el) => {
    el.preventDefault();
    dispatch(soundActions.soundsEdit(sound, null));
  };

  const handleSubmit = (el) => {
    el.preventDefault();
    const inputs = el.target.getElementsByTagName('input');
    const data = Array.from(inputs).reduce((acc, a) => ({
      ...acc, [a.name]: a.value
    }), {});

    if (!data.name) {
      return toasterInstance().then(_t =>
        _t.toast(intl.formatMessage({ id: 'import.error.empty' })));
    }
    return dispatch(soundActions.soundsEdit(sound, data));
  };

  return (
    <div className="item editing">
      <form onSubmit={handleSubmit}>
        <TextInput placeholder="list.editing_name" name="name" value={sound.name} intl={intl} />
        <TextInput placeholder="list.editing_tag" name="tags" value={sound.tags} intl={intl} />
        <a className="button" onClick={handleCancel}>
          {intl.formatMessage({ id: 'list.cancel' })}
        </a>
        <button
          className="button"
          style={{ backgroundColor: themes.get('btn'), borderColor: themes.get('btn') }}
        >{intl.formatMessage({ id: 'list.save' })}</button>
      </form>
    </div>
  );
};
