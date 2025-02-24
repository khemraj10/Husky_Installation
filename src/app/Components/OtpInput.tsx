'use client' // Ensure this runs only on the client side in Next.js

import React, { useRef } from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import OTPInput from 'react-otp-input'

interface OTPFormProps {
  onSubmit: (otp: string) => void
}

const OTPValidationSchema = Yup.object().shape({
  otp: Yup.string()
    .length(6, 'OTP must be exactly 6 digits')
    .matches(/^\d{6}$/, 'OTP must contain only numbers')
    .required('OTP is required'),
})

const OTPForm: React.FC<OTPFormProps> = ({ onSubmit }) => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]) // ✅ Use an array

  // Focus the next empty input field
  const focusNextInput = (index: number) => {
    if (inputRefs.current[index + 1]) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  return (
    <Formik
      initialValues={{ otp: '' }}
      validationSchema={OTPValidationSchema}
      onSubmit={(values) => {
        console.log('OTP Submitted:', values.otp)
        onSubmit(values.otp)
      }}
    >
      {({
        values,
        errors,
        touched,
        setFieldValue,
        handleSubmit,
        isSubmitting,
      }) => (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center gap-4 p-4 border rounded-lg shadow-md w-80"
        >
          <label className="text-lg font-semibold">Enter OTP</label>

          <OTPInput
            value={values.otp}
            onChange={(otp) => {
              setFieldValue('otp', otp)
              const nextIndex = otp.length // ✅ Get the next empty input index
              focusNextInput(nextIndex - 1)
            }}
            numInputs={6}
            shouldAutoFocus
            renderInput={(props, index) => (
              <input
                {...props}
                ref={(el) => {
                  inputRefs.current[index] = el
                }}
                type="text"
                inputMode="numeric"
                pattern="\d*"
                className="w-10 h-10 text-center text-xl border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-300 outline-none"
              />
            )}
          />

          {errors.otp && touched.otp && (
            <div className="text-red-500 text-sm">{errors.otp}</div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-4 py-2 rounded-md text-white ${
              isSubmitting ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'
            }`}
          >
            {isSubmitting ? 'Verifying...' : 'Verify OTP'}
          </button>
        </form>
      )}
    </Formik>
  )
}

export default OTPForm
