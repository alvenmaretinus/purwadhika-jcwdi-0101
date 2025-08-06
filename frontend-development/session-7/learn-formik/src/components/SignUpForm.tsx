'use client';

import { Formik, Form, Field, FormikProps } from 'formik';
import { object, string } from 'yup';
import axios from 'axios';
import { useState } from 'react';

const LoginSchema = object({
  email: string().email('Invalid email address format').required('Email is required'),
  password: string()
    .min(3, 'Password must be at least 3 characters')
    .required('Password is required'),
});

interface FormState {
  email: string;
  password: string;
}

const initialValues: FormState = { email: '', password: '' };

export default function SignUpForm() {
  const [isApiLoading, setIsApiLoading] = useState(false);

  const onSubmit = async (values: FormState) => {
    try {
      setIsApiLoading(true);
      const loginsApiUrl = `https://api.backendless.com/${process.env.NEXT_PUBLIC_BACKENDLESS_APPLICATION_ID}/${process.env.NEXT_PUBLIC_BACKENDLESS_API_KEY}/data/${'logins'}`;
      const response = await axios.post(loginsApiUrl, {
        email: values.email,
        password: values.password,
      });
      setIsApiLoading(false);

      // if success
      if (response.data) {
        alert(`successfully created new user "${response.data.email}"`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Formik initialValues={initialValues} validationSchema={LoginSchema} onSubmit={onSubmit}>
      {(props: FormikProps<FormState>) => {
        const { values, errors, touched, handleChange } = props;
        return (
          <Form>
            <div>
              <label htmlFor="email">Email: </label>
              <Field
                id="email"
                type="email"
                name="email"
                onChange={handleChange}
                value={values.email}
                className={touched.email && errors.email ? '!border-red-600' : ''}
              />
              {touched.email && errors.email && <div className="text-red-600">{errors.email}</div>}
            </div>
            <div>
              <label htmlFor="password">Password: </label>
              <Field
                id="password"
                type="password"
                name="password"
                onChange={handleChange}
                value={values.password}
                className={touched.password && errors.password ? '!border-red-600' : ''}
              />
              {touched.password && errors.password && (
                <div className="text-red-600">{errors.password}</div>
              )}
            </div>
            <button type="submit" className="border border-solid border-black">
              {isApiLoading ? 'loading' : 'signup'}
            </button>
          </Form>
        );
      }}
    </Formik>
  );
}
