import React, { useState,useEffect } from 'react';
import {
    CButton,
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CModalFooter,

} from '@coreui/react';
import QRCode from "react-qr-code";
import CIcon from '@coreui/icons-react'
import {  cilQrCode } from '@coreui/icons';
import PropTypes from 'prop-types'; // Import PropTypes
function ProfileQr(props) {
    const [visible, setVisible] = useState(false);
    const [UpdateMode, setUpdateMode] = useState({});


    useEffect(() => {
        setUpdateMode(props.selectedProfile);
    }, [props.selectedProfile]);

    return (
        <>
            <CButton color={"warning"} onClick={() => setVisible(!visible)}><CIcon icon={cilQrCode} /></CButton>
            <CModal
                alignment="center"
                visible={visible}
                onClose={() => setVisible(false)}
                aria-labelledby="VerticallyCenteredExample"
            >
                <CModalHeader onClose={() => setVisible(false)}>
                    <CModalTitle id="LiveDemoExampleLabel">Profiles</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <div style={{ height: "auto", margin: "0 auto", maxWidth: 256, width: "100%" }}>
                        <QRCode
                            size={500}
                            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                            value={JSON.stringify(UpdateMode)}
                            viewBox={`0 0 500 400`}
                        />
                    </div>

                    <CModalFooter>
                        <CButton color="secondary" onClick={() => setVisible(false)}>
                            Close
                        </CButton>
                        <CButton color="primary" type="submit" >Save changes</CButton>
                    </CModalFooter>



                </CModalBody>

            </CModal>
        </>
    );
};
ProfileQr.propTypes = {
    refresh: PropTypes.func.isRequired, // Ensure that 'refresh' is a function and is required
    selectedProfile: PropTypes.object, // Prop to pass the selected Profile for update mode
};
export default ProfileQr;
