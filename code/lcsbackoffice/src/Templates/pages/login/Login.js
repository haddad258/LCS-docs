import React from 'react'
import { Link } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import useAuth from 'src/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import i18n from 'src/i18n';

function Login() {
  const { login/* , checklogin  */ } = useAuth();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: 'adminA',
      password: 'adminA',
      remember: true
    },
    onSubmit: async (values) => {
      try {
        const logRes = await login(values.email, values.password);
        if (logRes) {
          navigate('/supper/view/applications/reporting');
        } else {
          alert(i18n.t('failedLoginErrorMessage'));
        }
      } catch (e) {
        console.error('Error during login:', e);
      }
    },
  });
  // // eslint-disable-next-line
  // const checkLog = async () => {
  //   const checkToken = await checklogin()
  //   checkToken ? navigate("/dashboard") : null
  // };
  // useEffect(() => {
  //   checkLog()
  // }, [])




  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={formik.handleSubmit}>
                    <h1>{i18n.t('signIn')}</h1>
                    <p className="text-body-secondary">{i18n.t('signInTitle')}</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput placeholder="Username"
                        autoComplete="username"
                        type="text"
                        {...formik.getFieldProps('email')}

                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        {...formik.getFieldProps('password')}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton type="submit" color="primary" className="px-4">
                        {i18n.t('signIn')}
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0">
                          {i18n.t('forgotPassword')}
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>{i18n.t('signUp')}</h2>
                    <p>
                    SoftSIM LCS Unlocking Connectivity, Empowering Freedom: Liberty Com System SoftSIM LCS - Where Mobility Meets Simplicity.
                    </p>
                    <Link to="/login/user">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>
                        {i18n.t('employeePortal')}
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
