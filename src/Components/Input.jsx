/* eslint-disable max-classes-per-file */
/* eslint-disable react/prefer-stateless-function */

import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Event from "../Tools/Event";

const ZircoUl = styled.ul`
  font-family: Verdana, Arial, sans - serif;
  font-size: 13px;
  color: #000000;
  line-height: 100%;
  box-sizing: border-box;
  float: left;
  width: 98%;
  list-style: none;
  margin: 0;
  padding: 3px;
  text-align: left;
  & > li {
    margin: 0 0 0 5px;
    padding: 0 3px 0 0;
    display: inline - block;
    & > label {
      margin: 0px;
      box-sizing: border-box;
      float: left;
      margin-top: 7px;
      margin-bottom: 3px;
      margin-right: 5px;
      padding: 0px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      text-align: right;
      min-height: 20px;
      color: #666;
      width: 120px;
    }
    & > div {
      line-height: 100%;
      min-height: 24px;
      min-width: 150px;
      margin: 0px;
      padding: 3px;
      box-sizing: border-box;
      margin-left: 128px;
      & > input[type="select"] {
        width: 150px;
        padding: 3px;
      }
    }
  }
`;

class Input extends React.Component {
  render() {
    const { name, value, label, type, onChange, valid } = this.props;
    return (
      <div>
        <label htmlFor={name}>{label}</label>
        <div>
          <input
            type={type}
            name={name}
            value={value}
            onChange={e => onChange(e)}
          />
          {valid.isInvalid && <span>{valid.message}</span>}
        </div>
      </div>
    );
  }
}

// Input.propTypes = {
//     onChange: PropTypes.func,
//     name: PropTypes.string.isRequired,
//     label: PropTypes.string,
//     value: PropTypes.string,
//     type: PropTypes.string,
//     valid: PropTypes.shape({ isInvalid: PropTypes.bool, message: PropTypes.string }),
// };

// Input.defaultProps = {
//     onChange: () => {},
//     label: null,
//     value: null,
//     type: 'text',
//     valid: {},
// };

export const Select = React.forwardRef((props, ref) => {
  const {
    name,
    value,
    label,
    options,
    onChange,
    onEnter,
    required,
    valid
  } = props;
  const change = e => {
    const event = new Event("change", { name, value: e.target.value }, e);
    onChange(event);
    if (!event.isDefaultPrevented()) {
      event.onComplete();
    }

    const enterEvent = new Event("enter", { name, value: 1 }, e);
    onEnter(enterEvent);
    if (!enterEvent.isDefaultPrevented()) {
      event.onComplete();
    }
  };
  return (
    <ZircoUl>
      <li>
        <label htmlFor={name}>{label}</label>
        <div>
          <select name={name} value={value} onChange={e => change(e)} ref={ref}>
            {!required && <option key="">-- Vyberte --</option>}
            {options &&
              options
                .map(item => {
                  if (typeof item === "object") {
                    return (
                      <option key={item.id} value={item.id}>
                        {item.text}
                      </option>
                    );
                  }
                  return <option key={item}>{item}</option>;
                })
                .reduce((acc, x) => (acc === null ? [x] : [acc, x]), null)}
          </select>
          {/* {valid.isInvalid && <span>{valid.message}</span>} */}
        </div>
      </li>
    </ZircoUl>
  );
});

Select.propTypes = {
  onChange: PropTypes.func,
  onEnter: PropTypes.func,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  options: PropTypes.arrayOf(PropTypes.any),
  required: PropTypes.bool,
  valid: PropTypes.shape({
    isInvalid: PropTypes.bool,
    message: PropTypes.string
  })
};

Select.defaultProps = {
  onChange: () => {},
  onEnter: () => {},
  label: "",
  value: "",
  options: [],
  required: false,
  valid: {}
};

export const Float = React.forwardRef((props, ref) => {
  const { name, value, label, valid, onChange, onEnter } = props;

  const change = e => {
    const event = new Event(
      "change",
      {
        name,
        value: parseFloat(e.target.value.replace(",", ".")) || undefined
      },
      e
    );
    onChange(event);
    if (!event.isDefaultPrevented()) {
      event.onComplete();
    }
  };

  const keypress = e => {
    if (e.key !== "Enter") return;
    const event = new Event("enter", { name, value: 1 }, e);
    onEnter(event);
    if (!event.isDefaultPrevented()) {
      event.onComplete();
    }
  };

  return (
    <ZircoUl>
      <li>
        <label htmlFor={name}>{label}</label>
        <div>
          <input
            type="number"
            name={name}
            value={typeof value === "undefined" ? "" : value}
            onChange={e => change(e)}
            onKeyPress={e => keypress(e)}
            ref={ref}
          />
          {valid.isInvalid && <span>{valid.message}</span>}
        </div>
      </li>
    </ZircoUl>
  );
});

Float.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  value: PropTypes.number,
  valid: PropTypes.shape({
    isInvalid: PropTypes.bool,
    message: PropTypes.string
  }),
  onChange: PropTypes.func,
  onEnter: PropTypes.func
};

Float.defaultProps = {
  onChange: () => {},
  onEnter: () => {},
  label: null,
  value: undefined,
  valid: {}
};

export function Integer(props) {
  const { onChange } = props;
  const change = e => {
    e.target.value = Math.floor(e.target.value);
    onChange(e);
  };
  return <Float {...props} onChange={e => change(e)} />;
}

Integer.propTypes = {
  onChange: PropTypes.func
};
Integer.defaultProps = {
  onChange: () => {}
};

class Radio extends React.Component {
  render() {
    const { name, value, label, options, onChange } = this.props;
    return (
      <div>
        <label htmlFor={name}>{label || name}</label>
        <div>
          {options
            .map(item => (
              <div key={`${name} _${item} `}>
                <label htmlFor={name}>
                  {item}{" "}
                  <input
                    type="radio"
                    name={name}
                    value={item}
                    checked={value === item}
                    onChange={e => onChange(e)}
                  />
                </label>
              </div>
            ))
            .reduce((acc, x) => (acc === null ? [x] : [acc, x]), null)}
        </div>
      </div>
    );
  }
}

export const AntFloat = React.forwardRef((props, ref) => {
  const { name, value, valid, onChange, onEnter, sample_id } = props;
  console.log(props);
  const change = e => {
    const event = new Event(
      "change",
      {
        name,
        value: parseFloat(e.target.value.replace(",", ".")) || undefined
      },
      e
    );
    onChange(event);
    if (!event.isDefaultPrevented()) {
      event.onComplete();
    }
  };

  const keypress = e => {
    if (e.key !== "Enter") return;
    const event = new Event("enter", { name, value: 1, sample_id }, e);
    onEnter(event);
    if (!event.isDefaultPrevented()) {
      event.onComplete();
    }
  };

  return (
    <div>
      <input
        type="number"
        name={name}
        value={typeof value === "undefined" ? "" : value}
        onChange={e => change(e)}
        onKeyPress={e => keypress(e)}
        ref={ref}
      />
      {valid.isInvalid && <span>{valid.message}</span>}
    </div>
  );
});

AntFloat.propTypes = {
  name: PropTypes.string.isRequired,
  sample_id: PropTypes.number.isRequired,
  value: PropTypes.number,
  valid: PropTypes.shape({
    isInvalid: PropTypes.bool,
    message: PropTypes.string
  }),
  onChange: PropTypes.func,
  onEnter: PropTypes.func
};

AntFloat.defaultProps = {
  onChange: () => {},
  onEnter: () => {},
  value: undefined,
  valid: {}
};
// Radio.propTypes = {
//     onChange: PropTypes.func,
//     name: PropTypes.string.isRequired,
//     label: PropTypes.string,
//     value: PropTypes.string,
//     options: PropTypes.arrayOf(PropTypes.any),
// };

// Radio.defaultProps = {r
