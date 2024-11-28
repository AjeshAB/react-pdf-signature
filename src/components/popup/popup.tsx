import { createPortal } from 'react-dom'
import { Fragment } from 'react/jsx-runtime'
import { Content, Header, Overlay } from '../../styled/popup'

type PopUpModalProps = {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
}
const PopUpModal = (props: PopUpModalProps): JSX.Element => {
  const { isOpen, onClose } = props
  if (!isOpen) return <Fragment />
  return createPortal(
    <Fragment>
      <Overlay onClick={onClose}>
        <Content onClick={e => e.stopPropagation()}>
          <Header>{props.title}</Header>
          {props.children}
        </Content>
      </Overlay>
    </Fragment>,
    document.body
  )
}

export default PopUpModal
