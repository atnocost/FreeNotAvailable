import React from "react";
import {
  AbsoluteFill,
  OffthreadVideo,
  Sequence,
  staticFile,
  useCurrentFrame,
  interpolate,
} from "remotion";
import { TextOverlay } from "../components/TextOverlay";
import { FilmGrain } from "../components/FilmGrain";
import { LogoOverlay } from "../components/LogoOverlay";
import { FPS } from "../constants";

// Film Reel - Quick cuts showreel
// 1920x1080, 16:9 landscape, 60s @ 30fps = 1800 frames

const CLIPS = [
  { src: "NOCTEM.mp4", startSec: 5, durFrames: 90 },
  { src: "VESPERA.mp4", startSec: 3, durFrames: 90 },
  { src: "ANTE.mp4", startSec: 2, durFrames: 90 },
  { src: "FREE - PILGRIM.mp4", startSec: 10, durFrames: 90 },
  { src: "F I N E B Y M E.mp4", startSec: 5, durFrames: 90 },
  { src: "FREE - MAYBE.mp4", startSec: 8, durFrames: 90 },
  { src: "FREE - FLO.mp4", startSec: 4, durFrames: 90 },
  { src: "FREE - CHAMBERS.mp4", startSec: 12, durFrames: 90 },
  { src: "FREE - TWINS.mp4", startSec: 6, durFrames: 90 },
  { src: "AT NO COST.mp4", startSec: 3, durFrames: 90 },
  { src: "NOCTEM.mp4", startSec: 30, durFrames: 90 },
  { src: "VESPERA.mp4", startSec: 20, durFrames: 90 },
  { src: "FREE - PILGRIM.mp4", startSec: 25, durFrames: 90 },
  { src: "ANTE.mp4", startSec: 15, durFrames: 90 },
  { src: "FREE - MAYBE.mp4", startSec: 20, durFrames: 90 },
  { src: "FREE - FLO.mp4", startSec: 18, durFrames: 90 },
  { src: "FREE - CHAMBERS.mp4", startSec: 25, durFrames: 90 },
  { src: "FREE - TWINS.mp4", startSec: 20, durFrames: 90 },
  { src: "NOCTEM.mp4", startSec: 45, durFrames: 90 },
];

// Precompute sequence offsets so we avoid mutation inside render
const CLIP_OFFSETS = CLIPS.reduce<number[]>((acc, clip, i) => {
  acc.push(i === 0 ? 0 : acc[i - 1] + CLIPS[i - 1].durFrames);
  return acc;
}, []);

export const FilmReel: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      {CLIPS.map((clip, i) => {
        const from = CLIP_OFFSETS[i];

        // Quick hard cuts with brief fade
        const crossfade = 4;
        const clipOpacity = interpolate(
          frame,
          [from, from + crossfade, from + clip.durFrames - crossfade, from + clip.durFrames],
          [0, 1, 1, 0],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );

        // Subtle slow zoom
        const scale = interpolate(
          frame,
          [from, from + clip.durFrames],
          [1.0, 1.05],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );

        return (
          <Sequence key={i} from={from} durationInFrames={clip.durFrames}>
            <AbsoluteFill style={{ opacity: clipOpacity }}>
              <OffthreadVideo
                src={staticFile(clip.src)}
                startFrom={clip.startSec * FPS}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transform: `scale(${scale})`,
                }}
              />
            </AbsoluteFill>
          </Sequence>
        );
      })}

      {/* Opening title */}
      <Sequence from={0} durationInFrames={60}>
        <TextOverlay
          text="FREE"
          fontSize={120}
          fontWeight={100}
          letterSpacing={32}
          color="#ffffff"
          position="center"
          fadeIn
          fadeOut
        />
      </Sequence>

      {/* Mid title */}
      <Sequence from={870} durationInFrames={60}>
        <TextOverlay
          text="OTHER WORLD"
          fontSize={64}
          fontWeight={200}
          letterSpacing={12}
          color="#ffffff"
          position="center"
          fadeIn
          fadeOut
        />
      </Sequence>

      {/* End card */}
      <Sequence from={1710} durationInFrames={90}>
        <AbsoluteFill
          style={{
            backgroundColor: "#000",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 60,
          }}
        >
          <TextOverlay
            text={"FREE\nOTHER WORLD"}
            fontSize={56}
            fontWeight={200}
            letterSpacing={8}
            color="#ffffff"
            position="center"
            fadeIn
            fadeOut={false}
          />
        </AbsoluteFill>
      </Sequence>

      <LogoOverlay startFrame={60} size={60} position="bottom-right" />
      <FilmGrain opacity={0.04} speed={4} />
    </AbsoluteFill>
  );
};
