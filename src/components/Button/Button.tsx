/** Dependencies */
import React from 'react'
import classnames from 'classnames';

/** Style */
import './Button.scss';
import { orderByIcon } from '../../assets/icons';

type Props = {
    title?: string;
    iconName?: string
} & React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

const Button = ({ title, className, iconName, ...props }: Props) => {
    return (
        <button className={classnames('app-button', className)} {...props} >
            <div className={classnames('',
                { 'app-button__inner-cotainer': !!iconName }
            )}>
                {iconName && <img src={iconName} />}
                <span>{title}</span>
            </div>

        </button>
    )
}

export default Button