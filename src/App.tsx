import React, { lazy, Suspense, useState } from 'react'
import '@/app.css'
import '@/app.less'
import imgTest from '@/assets/imgs/test.svg'
import {Demo1,Demo2} from './components'
const LazyDemo = lazy(()=>import('@/components/LazyDemo'))
const PreFetchDemo = lazy(()=>import(
/* webpackChunkName: "PreFetchDemo" */
  /*webpackPrefetch: true*/
  '@/components/PreFetchDemo'
))
const PreloadDemo = lazy(() => import(
  /* webpackChunkName: "PreloadDemo" */
  /*webpackPreload: true*/
  '@/components/PreloadDemo'
 ))
function App() {
  const [show,setShow] = useState(false)
  const toggleShow = ()=>setShow(true)
  return <>
  <h2>webpack5-react-tsa2</h2>
  <img src={imgTest}/>
  <Demo1/>
  <Demo2/>
  <h2 onClick={toggleShow}>展示</h2>
  { show && (
        <>
          <Suspense fallback={null}><PreloadDemo /></Suspense>
          <Suspense fallback={null}><PreFetchDemo /></Suspense>
        </>)}
  </>
}
export default App