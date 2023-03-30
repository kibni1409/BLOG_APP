export const Username = [
  {
    required: true,
    message: 'Please input your username!',
  },
  {
    min: 4,
    message: 'min 4 symbol',
  },
  {
    max: 20,
    message: 'max 20 symbol',
  },
]

export const Email = [
  {
    required: true,
    message: 'Please input your email!',
  },
  {
    type: 'email',
    message: 'The input is not valid E-mail!',
  },
  {
    min: 4,
    message: 'min 4 symbol',
  },
  {
    max: 20,
    message: 'max 20 symbol',
  },
]

export const Password = [
  {
    required: true,
    message: 'Please input your password!',
  },
  {
    min: 6,
    message: 'min 4 symbol',
  },
  {
    max: 40,
    message: 'max 20 symbol',
  },
]

export const ConfirmPassword = [
  {
    required: true,
    message: 'Please confirm your password!',
  },
  ({ getFieldValue }) => ({
    validator(_, value) {
      if (!value || getFieldValue('password') === value) {
        return Promise.resolve()
      }
      return Promise.reject(new Error('The two passwords that you entered do not match!'))
    },
  }),
]

export const Bio = [
  {
    max: 200,
    message: 'max 200 symbol',
  },
]

export const Avatar = [
  {
    type: 'url',
    message: 'url nut curren',
  },
]

export const Title = [
  {
    required: true,
    message: 'Please input your title!',
  },
]

export const Description = [
  {
    required: true,
    message: 'Please input your description!',
  },
]

export const Body = [
  {
    required: true,
    message: 'Please input your body!',
  },
]
