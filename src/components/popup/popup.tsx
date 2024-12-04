import { createPortal } from 'react-dom'
import { Fragment } from 'react/jsx-runtime'
import { Content, Header, Overlay } from '../../styled/popup'

type PopUpModalProps = {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
  className?: string
}
const PopUpModal = (props: PopUpModalProps): JSX.Element => {
  const { isOpen, onClose, title, className, children } = props
  if (!isOpen) return <Fragment />
  return createPortal(
    <Fragment>
      <Overlay className={className} onClick={onClose}>
        <Content onClick={e => e.stopPropagation()}>
          <Header>{title}</Header>
          {children}
        </Content>
      </Overlay>
    </Fragment>,
    document.body
  )
}

export default PopUpModal
