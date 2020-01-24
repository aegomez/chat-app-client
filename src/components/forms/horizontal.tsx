import React from 'react';

interface Props {
  label: string;
  labelClass?: string;
  bodyClass?: string;
}

const HorizontalControl: React.FC<Props> = ({
  children,
  label,
  labelClass = '',
  bodyClass = ''
}) => {
  return (
    <div className="field is-horizontal">
      <div className={'field-label is-normal' + labelClass}>
        <label className="label">{label}</label>
      </div>
      <div className="field-body">
        <div className={'field ' + bodyClass}>{children}</div>
      </div>
    </div>
  );
};

export { HorizontalControl };
