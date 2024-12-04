import styled from 'styled-components'

export const StyledPDFPageDiv = styled.div`
  position: relative;
  max-width: fit-content;
  border: 1px solid #e0e0e0;
`
export const StyledPDFPage = styled.section`
  position: relative;
  max-width: 43.875rem;
  display: flex;
  align-items: center;
  flex-direction: column;
  .pdf-editor-actions {
    z-index: 1000;
  }
  .pdf-editor-page {
    z-index: 1000;
  }
  .pdf-editor-navigation {
    position: absolute;
    top: 0;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    width: 100%;
    .pdf-editor-navigation-button {
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 100;
      .pdf-editor-button {
        cursor: pointer;
        border: none;
        border-radius: 10000px;
        width: 2.5rem;
        height: 2.5rem;
        display: flex;
        justify-content: center;
        align-items: center;
        .pdf-editor-navigation-button-icon {
          width: 1rem;
        }
      }
      .pdf-editor-button:disabled {
        cursor: not-allowed;
        .pdf-editor-navigation-button-icon {
          opacity: 0.5;
        }
      }
    }
  }
`
