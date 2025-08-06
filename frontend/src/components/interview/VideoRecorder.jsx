import { useState, useRef, useEffect } from 'react'
import { useInterview } from '../../context/InterviewContext'

const VideoRecorder = () => {
  const videoRef = useRef(null)
  const [stream, setStream] = useState(null)
  const [error, setError] = useState(null)
  const [isStreamReady, setIsStreamReady] = useState(false)
  const { isRecording, setIsRecording } = useInterview()

  useEffect(() => {
    startCamera()
    
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop())
      }
    }
  }, [])

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: 'user'
        },
        audio: true
      })
      
      setStream(mediaStream)
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream
      }
      setIsStreamReady(true)
      setError(null)
    } catch (err) {
      console.error('Failed to access camera:', err)
      setError('Camera access denied. Please allow camera access to continue.')
    }
  }

  const toggleRecording = () => {
    if (!stream) {
      setError('Camera not available')
      return
    }

    if (isRecording) {
      // Stop recording
      setIsRecording(false)
      // In real implementation, this would stop the MediaRecorder
    } else {
      // Start recording
      setIsRecording(true)
      // In real implementation, this would start the MediaRecorder
    }
  }

  if (error) {
    return (
      <div className="w-full h-full bg-gray-900 rounded-lg flex items-center justify-center">
        <div className="text-center text-white">
          <div className="text-4xl mb-4">📹</div>
          <h3 className="text-lg font-medium mb-2">Camera Access Required</h3>
          <p className="text-gray-300 text-sm mb-4">{error}</p>
          <button
            onClick={startCamera}
            className="btn-primary"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full h-full relative">
      {/* Video Display */}
      <div className="w-full h-full bg-black rounded-lg overflow-hidden relative">
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          className="w-full h-full object-cover"
        />
        
        {/* Recording Indicator */}
        {isRecording && (
          <div className="absolute top-4 left-4 flex items-center space-x-2 bg-red-600 text-white px-3 py-1 rounded-full">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            <span className="text-sm font-medium">Recording</span>
          </div>
        )}

        {/* Camera Controls */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleRecording}
              disabled={!isStreamReady}
              className={`w-16 h-16 rounded-full border-4 border-white flex items-center justify-center transition-all ${
                isRecording 
                  ? 'bg-red-600 hover:bg-red-700' 
                  : 'bg-transparent hover:bg-white hover:bg-opacity-20'
              } ${!isStreamReady ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isRecording ? (
                <div className="w-6 h-6 bg-white rounded"></div>
              ) : (
                <div className="w-8 h-8 bg-red-600 rounded-full"></div>
              )}
            </button>
          </div>
        </div>

        {/* Loading Overlay */}
        {!isStreamReady && !error && (
          <div className="absolute inset-0 bg-gray-900 flex items-center justify-center">
            <div className="text-center text-white">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-4"></div>
              <p className="text-sm">Initializing camera...</p>
            </div>
          </div>
        )}
      </div>

      {/* Video Info */}
      <div className="mt-4 text-center">
        <div className="flex items-center justify-center space-x-4 text-sm text-gray-400">
          <div className="flex items-center space-x-1">
            <div className={`w-2 h-2 rounded-full ${isStreamReady ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <span>{isStreamReady ? 'Camera Ready' : 'Camera Not Ready'}</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className={`w-2 h-2 rounded-full ${isRecording ? 'bg-red-500' : 'bg-gray-500'}`}></div>
            <span>{isRecording ? 'Recording' : 'Not Recording'}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VideoRecorder