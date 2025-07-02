import { useIntl } from "react-intl"

export default function Login() {
  const { formatMessage } = useIntl()

  return (
    <div id="login">
      {formatMessage({ id: 'login.title' })}
    </div>
  )
}