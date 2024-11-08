import React, { useEffect, useRef, useState } from 'react';
import * as faceapi from 'face-api.js';
import {
    CButton,
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CModalFooter,

} from '@coreui/react';
import CIcon from '@coreui/icons-react'
import { cilEyedropper } from '@coreui/icons';
import PropTypes from 'prop-types'; // Import PropTypes
function RcNNDetection({ imageCustomerurl }) {
    const [visible, setVisible] = useState(false);
    const imgRef = useRef();
    const canvasRef = useRef();
    const [imageUrl, setImageUrl] = useState(imageCustomerurl);
    const [isModelLoaded, setIsModelLoaded] = useState(false);



    useEffect(() => {
        const loadModels = async () => {
            try {
                await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
                await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
                await faceapi.nets.faceRecognitionNet.loadFromUri('/models');
                await faceapi.nets.faceExpressionNet.loadFromUri('/models');
                setIsModelLoaded(true);
            } catch (error) {
                console.error("Error loading models:", error);
                alert("Failed to load face detection models. Please check if the models are in the correct path.");
            }
        };
        loadModels();
    }, []);
    const handleImageLoad = async () => {
        const img = imgRef.current;
        const canvas = canvasRef.current;

        const displaySize = { width: img.width, height: img.height };
        faceapi.matchDimensions(canvas, displaySize);

        const detections = await faceapi.detectAllFaces(img, new faceapi.TinyFaceDetectorOptions())
            .withFaceLandmarks()
            .withFaceExpressions();

        const resizedDetections = faceapi.resizeResults(detections, displaySize);

        faceapi.draw.drawDetections(canvas, resizedDetections);
        faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
        faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
    };

    const handleUrlChange = (e) => {
        setImageUrl(e.target.value);
    };

    return (
        <>
            <CButton color={"success"} onClick={() => setVisible(!visible)}><CIcon icon={cilEyedropper} /></CButton>
            <CModal
                alignment="center"
                visible={visible}
                onClose={() => setVisible(false)}
                aria-labelledby="VerticallyCenteredExample"
                size='xl'
            >
                <CModalHeader onClose={() => setVisible(false)}>
                    <CModalTitle id="LiveDemoExampleLabel">Add Cushhhtomers</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CModalBody>
                        <div>
                            <h1>Face Detection from URL</h1>
                            {imageCustomerurl}
                            <input
                                type="text"
                                placeholder="Enter image URL"
                                value={imageUrl}
                                onChange={handleUrlChange}
                            />
                            <div style={{ marginTop: '20px' }}>
                                {imageUrl && (
                                    <>
                                        <img
                                            ref={imgRef}
                                            src={imageCustomerurl}
                                            alt="Face Detection"
                                            crossOrigin="anonymous"
                                            onLoad={handleImageLoad}
                                            width="500"
                                        />
                                        <canvas ref={canvasRef} style={{ position: 'absolute' }} />
                                    </>
                                )}
                            </div>
                            {!isModelLoaded && <p>Loading models...</p>}
                        </div>
                    </CModalBody>

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
RcNNDetection.propTypes = {
    refresh: PropTypes.func.isRequired, // Ensure that 'refresh' is a function and is required
    imageCustomerurl: PropTypes.object, // Prop to pass the selected Customer for update mode
};
export default RcNNDetection;
