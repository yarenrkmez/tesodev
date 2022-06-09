import React, { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Formik, Form as FormikForm, FormikProps, FormikHelpers } from "formik";

/** Components */
import { tesodevLogo } from '../../assets/images'
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';

/** Services */
import linksServices, { INewLinkPayload } from '../../services/linksServices';

/** Style */
import './AddLinkPage.scss';
import addLinkValidation from './addLinkValidation';
import { circleCloseIcon } from '../../assets/icons';
import classNames from 'classnames';



type Props = {}

const AddLinkPage = (props: Props) => {
  const navigator = useNavigate();
  const [errPopupVisibility, setErrPopupVisibility] = useState(false);

  const handleSubmit = (values: INewLinkPayload, formikAction: FormikHelpers<INewLinkPayload>) => {
    if (/^[a-zA-Z]+\s[a-zA-Z]+$/.test(values.nameSurname)) {
      linksServices.setNewLink(values);
      formikAction.resetForm();
      setErrPopupVisibility(false);
    } else {
      setErrPopupVisibility(true);
    }
  }

  return (
    <div className="add-link">
      <div className="add-link-header">
        <img className="add-link-header__logo" src={tesodevLogo} />
        <div className="add-link-header__navigation-button" onClick={() => {
          navigator(-1);
        }}>
          Return to List Page
        </div>
      </div>
      <div className="add-link__form-container">
        <Formik
          initialValues={{
            nameSurname: "",
            country: "",
            city: "",
            email: "",
          }}
          validationSchema={addLinkValidation}
          onSubmit={handleSubmit}
        >
          {(props: FormikProps<INewLinkPayload>) => {
            const { values, touched, errors, handleChange, handleBlur } = props;
            return (
              <FormikForm>
                <Input
                  labelText="Name Surname"
                  inputProps={{
                    onChange: handleChange,
                    placeholder: 'Enter name and surname',
                    name: 'nameSurname',
                    value: values.nameSurname,
                    onBlur: handleBlur
                  }}
                  errorText={!!(errors.nameSurname && touched.nameSurname) ? errors.nameSurname : ''}
                  className="add-link__input" />

                <Input
                  labelText="Country"
                  inputProps={{
                    onChange: handleChange,
                    placeholder: 'Enter a country',
                    name: 'country',
                    value: values.country,
                    onBlur: handleBlur
                  }}
                  errorText={!!(errors.country && touched.country) ? errors.country : ''}
                  className="add-link__input" />
                <Input
                  labelText="City"
                  inputProps={{
                    onChange: handleChange,
                    placeholder: 'Enter a city',
                    name: 'city',
                    value: values.city,
                    onBlur: handleBlur
                  }}
                  errorText={!!(errors.city && touched.city) ? errors.city : ''}
                  className="add-link__input" />
                <Input
                  labelText="Email"
                  inputProps={{
                    onChange: handleChange,
                    placeholder: 'Enter a email',
                    name: 'email',
                    value: values.email,
                    onBlur: handleBlur
                  }}
                  errorText={!!(errors.email && touched.email) ? errors.email : ''}
                  className="add-link__input" />
                <Button type="submit" title="Add" className="add-link__submit" />
              </FormikForm>
            );
          }}
        </Formik>
      </div>
      <div
        className={classNames(
          'popup--error-container',
          {
            'popup--error-container--hide': errPopupVisibility === false,
            'popup--error-container--show': errPopupVisibility === true
          }
        )}
      >
        <div className='popup--error-container__inside-container'>

          <div className='popup--error-container__inside-container__icon-container'>
            <img
              src={circleCloseIcon}
              onClick={() => { setErrPopupVisibility(false); }}
            />
          </div>

          <label className='popup--error-container__inside-container__header-text' >
            Error while adding link element
          </label>
          <div className='popup--error-container__inside-container__body--error-tag-container'>
            <div className='popup--error-container__inside-container__body--error-tag-container__element'>
              <span className='popup--error-container__inside-container__body--error-tag-container__element__text'>
                Error
              </span>

            </div>
          </div>

          <p className='popup--error-container__inside-container__body-text'>
            Name and surname should contain at least 2 words
          </p>
        </div>
      </div>

    </div>
  )
}

export default AddLinkPage