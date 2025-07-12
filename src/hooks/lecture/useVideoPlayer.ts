import { useRef, useState } from 'react';

export function useVideoPlayer() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const videoContainerRef = useRef<HTMLDivElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [volume, setVolume] = useState(1);
    const [videoProgress, setVideoProgress] = useState(0);
    const [isFullscreen, setIsFullscreen] = useState(false);

    const togglePlay = () => {
        if (!videoRef.current) return;
        if (isPlaying) {
            videoRef.current.pause();
        } else {
            videoRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const toggleMute = () => {
        if (!videoRef.current) return;
        videoRef.current.muted = !isMuted;
        setIsMuted(!isMuted);
    };

    const handleVolumeChange = (value: number) => {
        setVolume(value);
        if (videoRef.current) {
            videoRef.current.volume = value;
            setIsMuted(value === 0);
        }
    };

    const handleProgress = (e: React.SyntheticEvent<HTMLVideoElement>) => {
        const video = e.currentTarget;
        const progress = (video.currentTime / video.duration) * 100;
        setVideoProgress(progress);
    };

    const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!videoRef.current) return;
        const progressBar = e.currentTarget;
        const rect = progressBar.getBoundingClientRect();
        const pos = (e.clientX - rect.left) / rect.width;
        videoRef.current.currentTime = pos * videoRef.current.duration;
    };

    const seek = (seconds: number) => {
        if (videoRef.current) {
            videoRef.current.currentTime += seconds;
        }
    };

    const toggleFullscreen = () => {
        if (!videoContainerRef.current) return;

        if (!isFullscreen) {
            videoContainerRef.current.requestFullscreen?.();
        } else {
            document.exitFullscreen?.();
        }
        setIsFullscreen(!isFullscreen);
    };

    return {
        videoRef,
        videoContainerRef,
        isPlaying,
        isMuted,
        volume,
        videoProgress,
        isFullscreen,
        togglePlay,
        toggleMute,
        handleVolumeChange,
        handleProgress,
        handleSeek,
        toggleFullscreen,
        seek
    };
}
