import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { lazy, Suspense } from 'react';
import PixoraLoader from './utils/Loader.jsx';
const ShowPostPage = lazy(() => import('./pages/ShowPostPage.jsx'));
const Home = lazy(() => import('./pages/Home.jsx'))
const OtpVerification = lazy(() => import('./components/forgotPassword/OTPVerification.jsx'));
const RootLayout = lazy(() => import('./components/RootLayout.jsx'));
const EmailVerifiedPage = lazy(() => import('./pages/EmailVerifiedPage.jsx'))
const LandingPage = lazy(() => import('./pages/LandingPage.jsx'));
const RegisterPage = lazy(() => import('./pages/RegisterPage.jsx'))
const PageNotFound = lazy(() => import('./pages/PageNotFound.jsx'))
const Profile = lazy(() => import('./pages/Profile.jsx'));
const EditProfile = lazy(() => import('./pages/EditProfile.jsx'));
const Setting = lazy(() => import('./pages/Setting.jsx'));
const UserProfile = lazy(() => import('./pages/UserProfile.jsx'))
const SavedPosts = lazy(() => import('./pages/SavedPosts.jsx'));


const router = createBrowserRouter([{
  path: '/', element: <RootLayout />,
  children: [
    { index: true, element: <LandingPage /> },
    { path: '/signup', element: <RegisterPage /> },
    { path: '/email-verification', element: <EmailVerifiedPage /> },
    { path: '/forgot-password/new-password-setup', element: <OtpVerification /> },
    { path: '/profile', element: <Profile /> },
    { path: '/profile/edit', element: <EditProfile /> },
    { path: '/settings', element: <Setting /> },
    { path: '/home', element: <Home /> },
    { path: '/saved', element: <SavedPosts /> },
    { path: '/user/:username', element: < UserProfile /> },
  ]
},
{ path: '/post/:postPublicId', element: <ShowPostPage /> },
{ path: '*', element: <PageNotFound /> }
]);


function App() {

 return (
    <Suspense fallback={<PixoraLoader />}>
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;