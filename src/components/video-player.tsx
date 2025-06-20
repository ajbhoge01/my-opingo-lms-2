"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Play, Pause, Volume2, VolumeX, Maximize, RotateCcw } from "lucide-react"

interface VideoPlayerProps {
  videoUrl: string
  title?: string
  className?: string
}

// Helper function to extract YouTube video ID from URL
function getYouTubeVideoId(url: string): string | null {
  if (!url) return null

  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
  const match = url.match(regExp)

  return match && match[2].length === 11 ? match[2] : null
}

export default function VideoPlayer({ videoUrl, title, className = "" }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [showControls, setShowControls] = useState(true)
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const controlsTimeoutRef = useRef<NodeJS.Timeout>()

  const videoId = getYouTubeVideoId(videoUrl)

  useEffect(() => {
    if (showControls) {
      // Auto-hide controls after 3 seconds
      controlsTimeoutRef.current = setTimeout(() => {
        if (isPlaying) {
          setShowControls(false)
        }
      }, 3000)
    }

    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current)
      }
    }
  }, [showControls, isPlaying])

  const handleMouseMove = () => {
    setShowControls(true)
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current)
    }
  }

  const handlePlay = () => {
    if (iframeRef.current) {
      const iframe = iframeRef.current
      if (isPlaying) {
        // Pause video
        iframe.contentWindow?.postMessage('{"event":"command","func":"pauseVideo","args":""}', "*")
      } else {
        // Play video
        iframe.contentWindow?.postMessage('{"event":"command","func":"playVideo","args":""}', "*")
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleMute = () => {
    if (iframeRef.current) {
      const iframe = iframeRef.current
      if (isMuted) {
        iframe.contentWindow?.postMessage('{"event":"command","func":"unMute","args":""}', "*")
      } else {
        iframe.contentWindow?.postMessage('{"event":"command","func":"mute","args":""}', "*")
      }
      setIsMuted(!isMuted)
    }
  }

  const handleRestart = () => {
    if (iframeRef.current) {
      const iframe = iframeRef.current
      iframe.contentWindow?.postMessage('{"event":"command","func":"seekTo","args":[0, true]}', "*")
      iframe.contentWindow?.postMessage('{"event":"command","func":"playVideo","args":""}', "*")
      setIsPlaying(true)
    }
  }

  const handleFullscreen = () => {
    if (iframeRef.current) {
      if (iframeRef.current.requestFullscreen) {
        iframeRef.current.requestFullscreen()
      }
    }
  }

  if (!videoId) {
    return (
      <Card className={className}>
        <CardContent className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="text-gray-400 mb-2">
              <Play className="h-12 w-12 mx-auto" />
            </div>
            <p className="text-gray-600">Invalid video URL</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  const embedUrl = `https://www.youtube.com/embed/${videoId}?enablejsapi=1&rel=0&modestbranding=1&controls=0&showinfo=0`

  return (
    <Card className={`relative overflow-hidden ${className}`}>
      <div
        className="relative aspect-video bg-black"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => isPlaying && setShowControls(false)}
      >
        <iframe
          ref={iframeRef}
          src={embedUrl}
          title={title || "Video Player"}
          className="absolute inset-0 w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />

        {/* Custom Controls Overlay */}
        <div
          className={`absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent transition-opacity duration-300 ${
            showControls ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Center Play Button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <Button
              variant="ghost"
              size="lg"
              onClick={handlePlay}
              className="bg-black/20 hover:bg-black/40 text-white border-2 border-white/30 rounded-full w-16 h-16 p-0"
            >
              {isPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8 ml-1" />}
            </Button>
          </div>

          {/* Bottom Controls */}
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" onClick={handlePlay} className="text-white hover:bg-white/20">
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </Button>

                <Button variant="ghost" size="sm" onClick={handleMute} className="text-white hover:bg-white/20">
                  {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                </Button>

                <Button variant="ghost" size="sm" onClick={handleRestart} className="text-white hover:bg-white/20">
                  <RotateCcw className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" onClick={handleFullscreen} className="text-white hover:bg-white/20">
                  <Maximize className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Title Overlay */}
          {title && (
            <div className="absolute top-0 left-0 right-0 p-4">
              <h3 className="text-white text-lg font-semibold bg-black/20 rounded px-3 py-1 inline-block">{title}</h3>
            </div>
          )}
        </div>
      </div>
    </Card>
  )
}
