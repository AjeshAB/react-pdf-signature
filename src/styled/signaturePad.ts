import styled from 'styled-components'

const SignaturePadWrapper = styled('div')`
  width: 100% !important;
  height: 100% !important;
  canvas {
    border: 1px solid #4444 !important;
  }
  .signature-pad-actions {
    display: flex;
    justify-content: center;
    margin-top: 10px;
  }
  .signature-pad-text {
    text-align: center;
    margin-top: 10px;
    color: #00000054;
  }
`
export default SignaturePadWrapper
