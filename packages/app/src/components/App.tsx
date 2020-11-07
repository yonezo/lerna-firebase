import React, { useEffect, useState } from 'react';

export const App = () => {
  const [message, setMessage] = useState(undefined)
  useEffect(() => {
    const f = async () => {
      const projectId = process.env.PROJECT_ID
      const baseUrl = process.env.NODE_ENV === 'production' ? `https://us-central1-${projectId}.cloudfunctions.net` : `http://localhost:5001/${projectId}/us-central1`
      const res = await fetch(`${baseUrl}/hello`)
      const json = await res.json()
      setMessage(json.message)
    }
    f()
  })
  return (
    <div>
      {message && <h1>{message}</h1>}
    </div>
  )
}
