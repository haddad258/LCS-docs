import React from 'react'
import { CFooter } from '@coreui/react'
import i18n from 'src/i18n'

const AppFooter = () => {
  return (
    <CFooter className="px-4">
      {/* <div>
        <a href="https://coreui.io" target="_blank" rel="noopener noreferrer">
          CoreUI
        </a>
        <span className="ms-1">&copy; 2023 creativeLabs.</span>
      </div> */}
      <div className="ms-auto">
        <p onClick={() => console.log("test")} target="_blank" rel="noopener noreferrer">
          <span className="me-1">{i18n.t('poweredByFooter')} startup V06-11 </span>
        </p>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
