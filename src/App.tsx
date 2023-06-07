import React, { useId, useState } from 'react'
import '@/style/index.less'
import '@/app.less'

function App() {
  const id = useId()
  console.log(id, 'id')
  return (
    <>
      <h2>webpack5-react-mobx</h2>
    </>
  )
}
export default App
