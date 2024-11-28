import { Rnd } from 'react-rnd'
import { ImageType } from '../../../types/attachments'
import CircleXmarkIcon from '../../../icons/circleXmark'
import DeleteButtonDiv from '../../../styled/deleteButton'

const ImageComponent = (props: ImageType): JSX.Element => {
  const { canvasRef, positionTop, positionLeft, width, height, onDragStoped, onResizeStop, deleteImage } = props

  return (
    <Rnd
      onDragStop={onDragStoped}
      onResizeStop={onResizeStop}
      bounds='parent'
      style={{
        borderStyle: 'dashed',
        borderWidth: 2,
        borderColor: 'grey',
        width: width + 2,
        height: height + 2,
        cursor: 'move'
      }}
      minWidth={100}
      minHeight={100}
      size={{
        width: width,
        height: height
      }}
      position={{
        x: positionLeft,
        y: positionTop
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%'
        }}
      />
      <DeleteButtonDiv className='pdf-editor-attachment-delete' onClick={deleteImage}>
        <CircleXmarkIcon />
      </DeleteButtonDiv>
    </Rnd>
  )
}

export default ImageComponent

//
