'use client'

import React, { useRef, useEffect } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'

interface OTPFormProps {
  onSubmit: (otp: string) => void
}

const OTPValidationSchema = Yup.object().shape({
  otp: Yup.string()
    .length(6, 'OTP must be exactly 6 digits')
    .matches(/^[0-9]{6}$/, 'OTP must contain only numbers')
    .required('OTP is required'),
})

const OTPForm: React.FC<OTPFormProps> = ({ onSubmit }) => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus()
    }
  }, [])

  const formik = useFormik({
    initialValues: { otp: '' },
    validationSchema: OTPValidationSchema,
    onSubmit: (values) => {
      console.log('OTP Submitted:', values.otp)
      onSubmit(values.otp)
    },
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { value } = e.target
    if (!/^[0-9]?$/.test(value)) return

    const otpArray = formik.values.otp.split('')
    otpArray[index] = value
    formik.setFieldValue('otp', otpArray.join(''))

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === 'Backspace' && !formik.values.otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="flex flex-col items-center gap-4 p-4 border rounded-lg shadow-md w-80"
    >
      <label className="text-lg font-semibold">Enter OTP</label>
      <div className="flex gap-2">
        {[...Array(6)].map((_, index) => (
          <input
            key={index}
            ref={(el) => {
              inputRefs.current[index] = el
            }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={formik.values.otp[index] || ''}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className="w-10 h-10 text-center text-xl border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-300 outline-none"
            placeholder="-"
          />
        ))}
      </div>
      {formik.errors.otp && formik.touched.otp && (
        <div className="text-red-500 text-sm">{formik.errors.otp}</div>
      )}
      <button
        type="submit"
        disabled={formik.isSubmitting}
        className={`px-4 py-2 rounded-md text-white ${
          formik.isSubmitting ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'
        }`}
      >
        {formik.isSubmitting ? 'Verifying...' : 'Verify OTP'}
      </button>
    </form>
  )
}

export default OTPForm
