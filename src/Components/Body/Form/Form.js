import Style from './Form.module.css'

const Form = ({ title, callBack, children }) => {
  return (
    <>
      <h2>{title}</h2>
      <form onSubmit={callBack} className={Style.Form}>
        {children}
      </form>
    </>
  )
}

export default Form
