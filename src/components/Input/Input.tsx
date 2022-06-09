/** Dependencies */
import classNames from 'classnames';
import React from 'react'

/** Styles */
import './Input.scss';

type Props = {
    labelText?: string;
    errorText?: string;
    className?: string;
    iconImage?: any;
    inputProps?: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
}

const Input = ({ labelText, className, errorText, iconImage, inputProps, ...props }: Props) => {
    return (
        <div className={classNames('input-container', className, { 'input-container--error': !!errorText })} {...props}>
            {
                !!labelText && (
                    <label className="input-container__label">{labelText}</label>
                )
            }
            <input
                style={{ backgroundImage: `url(${iconImage})` }}
                className={
                    classNames(
                        'input-container__input',
                        {
                            'input-container__input--error': !!errorText,
                            'input-container__input--with-icon': !!iconImage
                        }
                    )
                }
                
                {...inputProps}
            />
            {
                !!errorText && (
                    <span className="input-container__error-text">{errorText}</span>
                )
            }
        </div>
    )
}

export default Input